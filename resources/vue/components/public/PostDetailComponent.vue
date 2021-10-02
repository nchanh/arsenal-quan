<template>
  <b-container class="mb-5">
    <b-card class="pd-card my-4">
      <b-card-img-lazy
        img-top
        :src="post.thumbnail || '/assets/images/banner/banner-0.jpg'"
        :alt="post.slug"
        class="pd-card-image"
      ></b-card-img-lazy>
      <div class="px-4 my-3">
        <b-card-title>
          <span
            class="pd-title-cateogry"
            v-if="post.category"
            v-text="post.category.name_vi"
          ></span>
          <h2 v-text="post.title"></h2>
        </b-card-title>
        <b-card-text class="post-detail-title-content">
          <h6 v-text="post.short_description"></h6>
          <b class="text-dark" v-if="post.user" v-text="post.user.fullname"></b>
          <span>- </span>
          <span>{{ post.created_at | formatDate }}</span>
        </b-card-text>
      </div>
    </b-card>
    <b-row>
      <b-col>
        <div class="post-detail-content">
          <div class="mb-5" v-html="post.content"></div>
          <div align="right">
            <h5>Nguồn <b>Arsenal Quán</b></h5>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.resetPost();
    this.getPost(this.$route.params.Pslug);
  },
  computed: {
    ...mapGetters({
      post: "post/getPost",
    }),
  },
  methods: {
    ...mapActions("post", ["getPost", "resetPost"]),
  },
};
</script>
<style scoped>
.pd-card {
  border-top: var(--red-color) solid 3px;
}
.pd-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
.post-detail-content {
  background-color: #fff;
  margin: 0 80px;
  padding: 20px;
  border-radius: 5px;
}
.post-detail-title-content {
  color: rgb(95, 95, 95);
}
.card-body {
  padding: 0 !important;
}
.pd-card-image {
  max-height: 500px;
}
</style>
