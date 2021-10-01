<template>
  <b-container class="mt-4">
    <b-row>
      <h2 class="title">
        <b-icon-search></b-icon-search>
        Tìm kiếm với từ khóa
        <span>{{ keyword }}</span>
      </h2>
      <b-col sm="12" md="12" lg="9" cols="12">
        <b-row align="center" v-if="loader">
          <b-col>
            <b-spinner variant="danger"></b-spinner>
          </b-col>
        </b-row>

        <b-card
          class="image mb-3"
          v-for="(item, index) in getOnlyPosts"
          :key="index"
          :img-src="item.thumbnail || '/assets/images/Logo-AQ-red.png'"
          img-alt="item.slug"
          img-left
        >
          <b-card-text class="body-text">
            <span class="category">{{ item.category.name_vi }}</span>
            <span class="card-body-title">
              {{ item.title }}{{ item.title }}{{ item.title }}{{ item.title }}
            </span>
            <span class="card-body-sd"
              >{{ item.short_description }}{{ item.short_description
              }}{{ item.short_description }}{{ item.short_description }}</span
            >
          </b-card-text>
        </b-card>
        <b-row v-if="getOnlyPosts.length === 0">
          Không có bài viết nào.
        </b-row>
        <b-row v-if="getOnlyPosts.length !== 0">
          <b-col>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              align="center"
              class="mt-3 customPagination"
              v-on:input="changePagination(currentPage)"
            >
            </b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="12" lg="3" cols="12">
        <widget-component></widget-component>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import WidgetComponent from "../../views/home/WidgetComponent.vue";

export default {
  components: {
    WidgetComponent,
  },
  data() {
    return {
      rows: 0,
      perPage: 0,
      currentPage: 1,
      keyword: "",
      statusPagination: false,
      loader: false
    };
  },
  created() {
    this.loader = true;
    this.keyword = this.$route.params.keyword;
    let options = {
      keyword: this.keyword,
      page: this.currentPage,
    };
    this.getSearch(options);
    this.setNumberPagination;
    this.loader = false;
  },
  watch: {
    $route(from) {
      this.loader = true;
      this.keyword = from.params.keyword;
      let options = {
        keyword: this.keyword,
        page: this.currentPage,
      };
      this.getSearch(options);
      this.setNumberPagination;
      this.loader = false;
    },
    getPaginationPosts(newValue) {
      if (!this.statusPagination) {
        this.rows = newValue.total;
        this.perPage = newValue.to;
        this.currentPage = newValue.current_page;
      }
      this.statusPagination = false;
    },
  },
  computed: {
    ...mapGetters({
      getPaginationPosts: "post/getSearchPosts",
    }),
    getOnlyPosts() {
      return this.getPaginationPosts.data;
    },
    setNumberPagination() {
      this.rows = this.getPaginationPosts.total;
      this.perPage = this.getPaginationPosts.to;
      this.currentPage = this.getPaginationPosts.current_page;
    },
  },
  methods: {
    ...mapActions("post", ["getSearch"]),
    changePagination(nextPage) {
      let options = {
        keyword: this.keyword,
        page: nextPage,
      };
      this.getSearch(options);
      this.statusPagination = true;
    },
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin-bottom: 15px;
  color: rgb(123, 123, 123);
}
.title span {
  color: #000;
}
.category {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
.card-body-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-body-sd {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-img-left {
  padding-top: 5px;
  height: 150px;
}
.card-body-sd {
  color: rgb(123, 123, 123);
}
</style>

