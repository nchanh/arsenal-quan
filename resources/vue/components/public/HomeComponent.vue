<template>
  <div>
    <b-container fluid>
      <carousel-component></carousel-component>
    </b-container>
    <b-container>
      <b-row class="home">
        <b-col cols="12" class="mt-4">
          <b-row class="title-post">
            <h4>Bài viết nổi bật</h4>
          </b-row>
          <hot-post-component
            :posts="getPostTop4Views"
            @postDetail="postDetail"
          ></hot-post-component>
        </b-col>
        <b-col sm="12" md="12" lg="9" cols="12" class="mt-4">
          <b-row class="title-post">
            <h4>Bài viết mới nhất</h4>
          </b-row>
          <new-post-component
            :posts="getOnlyPosts"
            @postDetail="postDetail"
          ></new-post-component>
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
          <b-row class="mt-3">
            <b-col>
              <random-post-component
                :posts="getPostRandom"
                @postDetail="postDetail"
              ></random-post-component>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" md="12" lg="3" cols="12" class="mt-4">
          <widget-component></widget-component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CarouselComponent from "../../views/home/Carousel.vue";
import NewPostComponent from "../../views/home/NewPostComponent.vue";
import HotPostComponent from "../../views/home/HotPostComponent.vue";
import RandomPostComponent from "../../views/home/RandomPostComponent.vue";
import WidgetComponent from "../../views/home/WidgetComponent.vue";

export default {
  components: {
    CarouselComponent,
    NewPostComponent,
    HotPostComponent,
    RandomPostComponent,
    WidgetComponent,
  },
  data() {
    return {
      rows: 0,
      perPage: 0,
      currentPage: 1,
    };
  },
  created() {
    this.getPosts(this.currentPage);
    this.getTop4Views();
    this.getOneRandom();
    this.setNumberPagination;
  },
  computed: {
    ...mapGetters({
      getPaginationProducts: "post/getPosts",
      getPostTop4Views: "post/getTop4Views",
      getPostRandom: "post/getOneRandom",
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
    ...mapActions("post", ["getPosts", "getTop4Views", "getOneRandom"]),
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
.home {
  margin-bottom: 50px;
}
.title-post {
  background-color: var(--red-color);
  color: #fff;
  padding: 15px 0px 5px 17px;
  margin: 0;
}
.title-post h4 {
  font-family: KanitMedium;
  text-transform: uppercase;
}
</style>
