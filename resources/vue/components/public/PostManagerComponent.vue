<template>
  <layout-public>
    <b-container>
      <h2 class="pm-title">
        <b-icon-newspaper></b-icon-newspaper>
        Quản lý bài viết
      </h2>
      <b-card class="mb-2">
        <b-card-text>
          <create-component
            :categories="categories"
            :post="post"
            @onInsertOrUpdate="onInsertOrUpdate"
            ref="postCreate"
          ></create-component>
        </b-card-text>
      </b-card>
      <b-card class="post-list mb-5">
        <b-card-text>
          <list-component
            :posts="posts"
            :rows="totalRows"
            @onRemovePost="onRemovePost"
            @requestUpdatePost="requestUpdatePost"
          ></list-component>
        </b-card-text>
      </b-card>
    </b-container>
    <loader-component v-if="loader"></loader-component>
  </layout-public>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LayoutPublic from "../layouts/LayoutPublic.vue";
import CreateComponent from "../../views/products/CreateComponent.vue";
import ListComponent from "../../views/products/ListComponent.vue";
import LoaderComponent from "../../views/helper/LoaderComponent.vue";

export default {
  components: {
    LayoutPublic,
    CreateComponent,
    ListComponent,
    LoaderComponent
  },
  data() {
    return {
      post: {
        id: null,
        title: "",
        short_description: "",
        category_id: null,
        thumbnail: "",
        content: "",
        status: "0",
        isEdit: false,
      },
      posts: [],
      totalRows: 0,
      loader: false
    };
  },
  created() {
    this.getAllPosts();
    this.reloadGetPosts();
    this.getCategories();
  },
  computed: {
    ...mapGetters({
      categories: "category/getCategories",
      getPosts: "post/getAllPosts",
      getError: "post/getError",
    }),
  },
  methods: {
    ...mapActions("category", ["getCategories"]),
    ...mapActions("post", ["getAllPosts", "removePost", "insertPost", "updatePost"]),
    reloadGetPosts() {
      this.posts = this.getPosts;
      this.totalRows = this.posts.length;
    },
    onRemovePost(postId) {
      this.loader = true;
      this.removePost(postId)
        .then(() => {
          this.reloadGetPosts();
          this.loader = false;
          this.$toast.info("Bạn đã xóa bài viết thành công.");
        })
        .catch(() => {
          this.loader = false;
          this.$toast.error("Đã xảy ra lỗi vui lòng thử lại sau.");
        });
    },
    async onInsertOrUpdate() {
      this.loader = true;
      if (this.post.isEdit) {
        await this.updatePost(this.post).then(() => {
          if (this.getError) {
            this.$toast.error("Tiêu đề bài viết này đã tồn tại.");
          } else {
            this.reloadGetPosts();
            this.$refs.postCreate.onCancelUpdate();
            this.$toast.success("Bạn đã cập nhật bài viết thành công.");
          }
          this.loader = false;
        });
      } else {
        await this.insertPost(this.post).then(() => {
          if (this.getError) {
            this.$toast.error("Tiêu đề bài viết này đã tồn tại.");
          } else {
            this.reloadGetPosts();
            this.$refs.postCreate.onReset();
            this.$toast.success("Bạn đã thêm một bài viết thành công.");
          }
          this.loader = false;
        });
      }
    },
    requestUpdatePost(postInput) {
      this.post = postInput;
    },
  },
};
</script>
<style>
.post-list .card-body {
  padding: 0 !important;
}
.pm-title {
  margin: 15px 0;
  text-transform: uppercase;
}
</style>
