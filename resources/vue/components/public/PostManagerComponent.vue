<template>
  <b-container>
    <h3 class="pm-title">
      <b-icon-newspaper></b-icon-newspaper>
      Quản lý bài viết
    </h3>
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
    <loader-component v-if="loader"></loader-component>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CreateComponent from "../../views/products/CreateComponent.vue";
import ListComponent from "../../views/products/ListComponent.vue";
import LoaderComponent from "../../views/helper/LoaderComponent.vue";

export default {
  components: {
    CreateComponent,
    ListComponent,
    LoaderComponent,
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
      loader: false,
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
      getStringError: "post/getStringError",
    }),
  },
  methods: {
    ...mapActions("category", ["getCategories"]),
    ...mapActions("post", [
      "getAllPosts",
      "removePost",
      "insertPost",
      "updatePost",
      "resetStringError",
    ]),
    reloadGetPosts() {
      this.posts = this.getPosts;
      this.totalRows = this.posts.length;
    },
    async onRemovePost(postId) {
      this.loader = true;
      await this.removePost(postId)
        .then(() => {
          if (this.getStringError) {
            this.$toast.error(this.getStringError);
            this.resetStringError();
          } else {
            this.reloadGetPosts();
            this.$toast.info("Bạn đã xóa bài viết thành công.");
          }
          this.loader = false;
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
          if (this.getStringError) {
            this.$toast.error(this.getStringError);
            this.resetStringError();
          } else if (this.getError) {
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
          if (this.getStringError) {
            this.$toast.error(this.getStringError);
            this.resetStringError();
          } else if (this.getError) {
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
      if (postInput.thumbnail) {
        this.$refs.postCreate.inputFilePlaceholder =
          "Thay đổi ảnh mô tả tại đây...";
      } else {
        this.$refs.postCreate.inputFilePlaceholder =
          "Vui lòng chọn ảnh mô tả tại đây...";
      }
    },
  },
};
</script>
<style>
.post-list .card-body {
  padding: 0 !important;
}
.pm-title {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin: 18px 0;
  font-family: KanitMedium;
  text-transform: uppercase;
}
</style>
