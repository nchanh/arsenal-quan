<template>
  <b-col class="py-2 post-image" sm="12" md="6" lg="6" cols="12">
    <b-card
      no-body
      class="overflow-hidden post-cart"
      @click="postDetail(post.slug)"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img-lazy
            :src="post.thumbnail || '/assets/images/Logo-AQ-red.png'"
            :alt="post.slug"
            class="rounded-0 post-img"
          ></b-card-img-lazy>
        </b-col>
        <b-col md="6" class="post-text">
          <b-card-body>
            <span
              class="post-title-cateogry"
              v-if="post.category"
              v-text="post.category.name_vi"
            ></span>
            <b-card-title class="post-title">
              {{ post.title }}
            </b-card-title>
            <b-card-text class="post-short-description">
              {{ post.short_description }}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>
<script>
export default {
  props: {
    post: Object,
  },
  methods: {
    postDetail(slug) {
      this.$router.push({ name: "postDetail", params: { Pslug: slug } });
    },
  },
};
</script>

<style scoped>
.post-cart:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.post-cart {
  max-width: 540px;
}
.post-img {
  height: 100%;
  border-top: var(--red-color) solid 3px;
}
.post-text {
  border-top: var(--red-color) solid 3px;
}
.post-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
.post-title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-short-description {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
