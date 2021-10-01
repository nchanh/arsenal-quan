<template>
  <b-container>
    <b-row class="title-post mt-4">
      <h4>{{ getOnlyPosts[0].category.name_vi }}</h4>
    </b-row>

    <b-row class="new-post">
      <category-component
        v-for="(item, index) in getOnlyPosts"
        :key="index"
        :post="item"
      ></category-component>
    </b-row>

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
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CategoryComponent from "../../views/search/CategoryComponent.vue";

export default {
  components: { CategoryComponent },
  data() {
    return {
      rows: 0,
      perPage: 0,
      currentPage: 1,
      categorySlug: "",
      statusPagination: false,
      loader: true,
    };
  },
  created() {
    this.loader = true;
    this.categorySlug = this.$route.params.categorySlug;
    let options = {
      categorySlug: this.categorySlug,
      page: this.currentPage,
    };
    this.getSearchCategory(options);
    this.setNumberPagination;
    this.loader = false;
  },
  watch: {
    $route(from) {
      this.loader = true;
      this.categorySlug = from.params.categorySlug;
      let options = {
        categorySlug: this.categorySlug,
        page: this.currentPage,
      };
      this.getSearchCategory(options);
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
      getPaginationPosts: "post/getCategoryPosts",
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
    ...mapActions("post", ["getSearchCategory"]),
    changePagination(nextPage) {
      let options = {
        categorySlug: this.categorySlug,
        page: nextPage,
      };
      this.getSearchCategory(options);
      this.statusPagination = true;
    },
  },
};
</script>
<style scoped>
.title-post {
  background-color: var(--red-color);
  color: #fff;
  padding: 15px 0px 5px 17px;
  margin: 0;
}
</style>
