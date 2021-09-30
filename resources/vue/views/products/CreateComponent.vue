<template>
  <div class="post-form">
    <b-form @submit.prevent="submit" @reset.prevent="onReset">
      <b-form-group label="Tiêu đề" label-for="title">
        <b-form-input
          id="title"
          name="title"
          v-validate="'required|max:190'"
          :state="validateState('title')"
          aria-describedby="title-feedback"
          data-vv-as="tiêu đề"
          v-model="post.title"
          type="text"
          placeholder="Tiêu đề"
          size="sm"
        ></b-form-input>
        <b-form-invalid-feedback id="title-feedback">
          {{ veeErrors.first("title") }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Mô tả ngắn" label-for="short_description">
        <b-form-input
          id="short_description"
          name="short_description"
          v-validate="'required|max:190'"
          :state="validateState('short_description')"
          aria-describedby="short_description-feedback"
          data-vv-as="mô tả ngắn"
          v-model="post.short_description"
          type="text"
          placeholder="Mô tả ngắn"
          size="sm"
        ></b-form-input>
        <b-form-invalid-feedback id="short_description-feedback">
          {{ veeErrors.first("short_description") }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Loại danh mục">
        <b-form-select v-model="post.category_id" size="sm" id="category">
          <template #first>
            <b-form-select-option value="null" disabled
              >-- Vui lòng chọn loại danh mục --
            </b-form-select-option>
          </template>
          <b-form-select-option
            v-for="(item, index) in categories"
            :key="index"
            v-model="item.id"
          >
            {{ item.name_vi }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Hình ảnh" label-for="file-image">
        <b-row v-if="post.thumbnail" class="mb-1">
          <b-col>
            <img class="preview" :src="post.thumbnail" />
          </b-col>
        </b-row>
        <b-row>
          <div :class="imageData ? 'col-11' : 'col-12'">
            <b-form-file
              id="file-image"
              accept="image/*"
              placeholder="Vui lòng chọn hình ảnh tại đây..."
              size="sm"
              @change="previewImage"
            ></b-form-file>
          </div>
          <div class="col-1 px-0" v-if="imageData != null">
            <b-button @click="onUpload" size="sm" title="Tải ảnh lên" :class="uploadValue === 0 ? 'btn-primary' : 'btn-success'">
              <b-icon-cloud-upload v-if="uploadValue === 0"></b-icon-cloud-upload>
              <b-icon-check2-circle v-else-if="uploadValue === 100"></b-icon-check2-circle>
              <b-spinner small label="Small Spinner" v-else></b-spinner>
              Tải ảnh
            </b-button>
          </div>
        </b-row>
      </b-form-group>

      <b-form-group label="Trạng thái" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="radio-group-2"
          v-model="post.status"
          :aria-describedby="ariaDescribedby"
          name="radio-sub-component"
          size="sm"
        >
          <b-form-radio value="0">Không hiển thị</b-form-radio>
          <b-form-radio value="1">Hiển thị</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-form-group label="Nội dung">
        <tinymce
          id="content"
          :other_options="tinyOptions"
          v-model="post.content"
        ></tinymce>
      </b-form-group>
      <b-form-group class="text-right">
        <b-button
          v-if="post.isEdit"
          @click.prevent="onCancelUpdate"
          variant="danger"
          title="Hủy bỏ cập nhật"
        >
          <b-icon-x></b-icon-x>
          Hủy cập nhật
        </b-button>
        <b-button
          type="reset"
          variant="warning"
          title="Đặt lại tất cả các trường"
        >
          <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise>
          Đặt lại
        </b-button>
        <b-button type="submit" variant="danger" title="Xác nhận">
          <b-icon-check-circle></b-icon-check-circle>
          <span v-if="post.isEdit">Cập nhật</span>
          <span v-else>Thêm</span>
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  props: {
    post: Object,
    categories: Array,
  },
  data() {
    return {
      tinyOptions: {
        height: 200,
      },
      error: false,
      imageData: null,
      uploadValue: 0,
      uploaded: false,
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = true;
        } else if (this.post.category_id === null) {
          this.error = false;
          this.$toast.error("Vui lòng chọn danh mục của bài viết.");
        } else if (this.post.thumbnail === "") {
          this.error = false;
          this.$toast.error("Vui lòng chọn ảnh cho bài viết.");
        } else if (this.post.content === "") {
          this.error = false;
          this.$toast.error("Vui lòng nhập nội dung của bài viết.");
        } else {
          this.error = false;
          this.$toast.error("Vui lòng nhập đầy đủ thông tin bài viết.");
        }

        if (this.error) {
          try {
            this.$emit("onInsertOrUpdate");
          } catch (error) {
            this.$toast.error("Đã xảy ra lỗi vui lòng thử lại.");
          }
        }
      });
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onReset() {
      this.post.title = "";
      this.post.short_description = "";
      this.post.category_id = null;
      this.post.thumbnail = "";
      this.post.content = "";
      this.post.status = "0";
      this.imageData = null;
      this.uploadValue = 0;
      this.uploaded = false;
    },
    onCancelUpdate() {
      this.post.id = null;
      this.post.title = "";
      this.post.short_description = "";
      this.post.category_id = null;
      this.post.thumbnail = "";
      this.post.content = "";
      this.post.status = "0";
      this.post.isEdit = false;
      this.imageData = null;
      this.uploadValue = 0;
      this.uploaded = false;
    },
    previewImage(event) {
      this.uploaded = false;
      this.uploadValue = 0;
      this.post.thumbnail = null;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      if (this.uploaded) {
        this.$toast.error("Ảnh đã được tải lên.");
        return;
      }
      this.post.thumbnail = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.post.thumbnail = url;
          });
          this.uploaded = true;
        }
      );
    },
  },
};
</script>

<style>
.preview {
  width: 200px;
}
</style>
