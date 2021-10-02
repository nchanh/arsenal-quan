<template>
  <b-container class="mt-4">
    <b-row>
      <h4 class="title">
        <b-icon-search></b-icon-search>
        Tìm kiếm với từ khóa
        <span>{{ keyword }}</span>
      </h4>
      <b-col sm="12" md="12" lg="9" cols="12">
        <b-row align="center" v-if="loader">
          <b-col>
            <b-spinner variant="danger"></b-spinner>
          </b-col>
        </b-row>

        <search-component :posts="getOnlyPosts" @postDetail="postDetail"></search-component>

        <b-row v-if="getOnlyPosts.length === 0"> Không có bài viết nào. </b-row>

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
import SearchComponent from "../../views/search/SearchComponent.vue";

export default {
  components: {
    SearchComponent,
    WidgetComponent,
  },
  data() {
    return {
      rows: 0,
      perPage: 0,
      currentPage: 1,
      keyword: "",
      statusPagination: false,
      loader: false,
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
    postDetail(slug) {
      this.$router.push({ name: "postDetail", params: { Pslug: slug } });
    },
  },
};
</script>

<style scoped>
.title {
  font-family: KanitMedium;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin-bottom: 15px;
  color: rgb(123, 123, 123);
}
.title span {
  color: #000;
}
</style>

