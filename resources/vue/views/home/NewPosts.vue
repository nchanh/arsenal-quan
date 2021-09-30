<template>
  <div>
    <b-row class="title-post mt-4">
      <h4>Bài viết mới nhất</h4>
    </b-row>
    <b-row>
      <b-col
        class="py-2 new-post-image"
        sm="12"
        md="6"
        lg="6"
        cols="12"
        v-for="(item, index) in getOnlyPosts"
        :key="index"
      >
        <b-card
          no-body
          class="overflow-hidden new-post-cart"
          @click="postDetail(item.slug)"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img-lazy
                :src="item.thumbnail || '/assets/images/Logo-AQ-red.png'"
                :alt="item.slug"
                class="rounded-0 new-post-img"
              ></b-card-img-lazy>
            </b-col>
            <b-col md="6" id="new-post-text">
              <b-card-body>
                <span
                  class="np-title-cateogry"
                  v-if="item.category"
                  v-text="item.category.name_vi"
                ></span>
                <b-card-title class="new-post-title">
                  {{ item.title }}
                </b-card-title>
                <b-card-text class="new-post-short-description">
                  {{ item.short_description }}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      rows: 0,
      perPage: 0,
      currentPage: 1,
    };
  },
  created() {
    this.getPosts(this.currentPage);
    this.setNumberPagination;
  },
  computed: {
    ...mapGetters({
      getPaginationProducts: "post/getPosts",
    }),
    getOnlyPosts() {
      return this.getPaginationProducts.data;
    },
    setNumberPagination() {
      this.rows = this.getPaginationProducts.total;
      this.perPage = this.getPaginationProducts.to;
      this.currentPage = this.getPaginationProducts.current_page;
    },
  },
  methods: {
    ...mapActions("post", ["getPosts"]),
    changePagination(nextPage) {
      this.getPosts(nextPage);
    },
    postDetail(slug) {
      this.$router.push({ name: "postDetail", params: { Pslug: slug } });
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
.title-post h4 {
  text-transform: uppercase;
}
.new-post-cart:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.new-post-cart {
  max-width: 540px;
}
.new-post-title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.new-post-short-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.new-post-img {
  height: 100%;
}
.np-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
</style>
