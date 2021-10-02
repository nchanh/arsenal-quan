<template>
  <b-card
    no-body
    class="random-post mt-2"
    @click="onPostDetail(getPost.slug)"
  >
    <b-row no-gutters>
      <b-col md="8">
        <b-card-img
          :src="getPost.thumbnail || '/assets/images/banner/banner-2.jpg'"
          :alt="getPost.slug"
          class="card-image rounded-0"
        ></b-card-img>
      </b-col>
      <b-col md="4">
        <b-card-body>
          <b-card-text>
            <span
              class="rp-title-cateogry"
              v-if="getPost.category"
              v-text="getPost.category.name_vi"
            ></span>
            <b-card-title class="rp-title">
              {{ getPost.title }}
            </b-card-title>
            <b-card-text class="rp-short-description">
              {{ getPost.short_description }}
            </b-card-text>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    posts: Array,
  },
  computed: {
    getPost() {
      return this.posts[0];
    },
  },
  methods: {
    onPostDetail(slug) {
      this.$emit("postDetail", slug);
    },
  },
};
</script>

<style scoped>
.random-post {
  border-top: var(--red-color) solid 3px;
}
.random-post:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.rp-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 14px;
  text-transform: uppercase;
}
.rp-title {
  font-size: 22px;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-short-description {
  color: rgba(123, 123, 123);
  font-size: 16px;
  font-family: KanitLight;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-image {
  height: 300px;
}
</style>
