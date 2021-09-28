<template>
  <div class="post-list">
    <b-row class="mt-3 mb-2">
      <b-col cols="6">
        <h4 class="ml-4">Danh sách bài viết</h4>
      </b-col>
      <b-col align="right" cols="6">
        <b-form-group
          label="Tìm kiếm"
          label-for="filter-input"
          label-cols-sm="3"
          label-size="sm"
          class="mb-0 col-12"
        >
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            size="sm"
            placeholder="Tin Arsenal, Tin chuyển nhượng, Lịch thi đấu..."
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :small="true"
      :hover="true"
      :items="posts"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-debounce="1000"
      @filtered="onFiltered"
      ref="table"
      responsive
      class="post-list-table"
    >
      <template #cell(stt)="row">
        <span>{{ ++row.index }}</span>
      </template>
      <template #cell(title)="row">
        <span>{{ row.item.title }}</span>
      </template>
      <template #cell(name_vi)="row">
        <span>{{ row.item.category.name_vi }}</span>
      </template>
      <template #cell(username)="row">
        <span>{{ row.item.user.username }}</span>
      </template>
      <template #cell(created_at)="row">
        <span>{{ row.item.created_at | formatDate }}</span>
      </template>
      <template #cell(status)="row">
        <span v-if="row.item.status == 0">Ẩn</span>
        <span v-else>Hiện</span>
      </template>
      <template #cell(actions)="row">
        <b-button
          id="show-post"
          size="sm"
          class="btn btn-primary mb-1"
          @click="showModal(row.item.slug)"
        >
          <b-icon-search></b-icon-search> Xem
        </b-button>
        <b-button
          size="sm"
          class="btn btn-warning mb-1"
          @click="updatePost(row.item)"
        >
          <b-icon-pencil-square></b-icon-pencil-square> Sửa
        </b-button>
        <b-button
          size="sm"
          class="btn btn-danger"
          @click="deletePost(row.item.id)"
        >
          <b-icon-trash-fill></b-icon-trash-fill> Xóa
        </b-button>
      </template>
    </b-table>
    <b-row>
      <b-col align="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-modal size="xl" ref="modal-post-detal" hide-footer>
      <template #modal-title>
        <router-link
          :to="{ name: 'postDetail', params: { Pslug: post.slug } }"
          class="text-dark"
        >
          <b-icon-search></b-icon-search> Xem chi tiết bài đăng
        </router-link>
      </template>
      <b-col>
        <b-card class="pd-card my-4">
          <b-card-img-lazy
            img-top
            :src="post.thumbnail || '/assets/images/banner/banner-0.jpg'"
            :alt="post.slug"
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
              <b
                class="text-dark"
                v-if="post.user"
                v-text="post.user.fullname"
              ></b>
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
      </b-col>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    posts: Array,
    totalRows: Number,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "stt",
          label: "STT",
          sortable: true,
          thClass: "text-center col-1",
          tdClass: "text-center",
        },
        {
          key: "title",
          label: "Tiêu đề",
          sortable: true,
          thClass: "text-center col-2",
        },
        {
          key: "category.name_vi",
          label: "Dah mục",
          sortable: true,
          thClass: "text-center col-2",
          tdClass: "text-center",
        },
        {
          key: "user.username",
          label: "Người viết",
          sortable: true,
          thClass: "text-center col-2",
          tdClass: "text-center",
        },
        {
          key: "created_at",
          label: "Thời gian",
          sortable: true,
          thClass: "text-center col-2",
          tdClass: "text-center",
        },
        {
          key: "status",
          label: "Trạng thái",
          thClass: "text-center col-2",
          tdClass: "text-center",
        },
        { key: "actions", label: "", thClass: "col-1", tdClass: "text-center" },
      ],
    };
  },
  created() {
    this.getPost("");
  },
  computed: {
    ...mapGetters({
      post: "post/getPost",
    }),
  },
  methods: {
    ...mapActions("post", ["getPost"]),
    onFiltered(filteredItems) {
      setTimeout(500);
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    seenPost(slug) {
      this.getPost(slug);
      this.$refs["my-modal-post-detal"].show();
    },
    updatePost(post) {
      let postUpdate = {
        id: post.id,
        title: post.title,
        short_description: post.short_description,
        category_id: post.category_id,
        thumbnail: post.thumbnail,
        status: post.status,
        content: post.content,
        isEdit: true,
      };
      this.$emit("requestUpdatePost", postUpdate);

      // this.$emit("onTop");
    },
    deletePost(id) {
      this.$bvModal
        .msgBoxConfirm("Bạn chắc chắn xóa bài viết này?", {
          title: "Vui lòng xác nhận",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Tôi muốn xóa",
          cancelTitle: "Đóng",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$emit("onRemovePost", id);
          }
        });
    },
    showModal(slug) {
      this.getPost(slug);
      this.$refs["modal-post-detal"].show();
    },
  },
};
</script>

<style scoped>
.post-list-table table thread tr th {
  text-align: center !important;
}
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
.pd-card .card-body {
  padding: 0 !important;
}
</style>
