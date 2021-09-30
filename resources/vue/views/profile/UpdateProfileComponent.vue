<template>
  <b-form @submit.prevent="update" class="col-sm-12 col-md-12 col-lg-8 col-12">
    <b-row>
      <b-col cols="12" sm="12" md="12" lg="5">
        <b-card bg-variant="light">
          <b-overlay
            :show="loaderImage"
            class="d-inline-block"
            rounded="circle"
          >
            <b-img-lazy
              :src="user.image || '/assets/images/Logo-AQ-red.png'"
              rounded="circle"
              alt="Circle image"
              width="200"
              height="200"
              center
            />
          </b-overlay>
          <b-row>
            <b-col>
              <b-form-file
                id="file-image"
                accept="image/*"
                placeholder="Vui lòng chọn ảnh..."
                size="sm"
                class="mt-4 mb-2"
                @change="previewImage"
              ></b-form-file>
            </b-col>
          </b-row>
          <b-row v-if="imageData != null" align="center">
            <b-col>
              <b-button
                @click="onUpload"
                size="sm"
                title="Tải ảnh lên"
                :class="uploadValue === 0 ? 'btn-primary' : 'btn-success'"
              >
                <b-icon-cloud-upload
                  v-if="uploadValue === 0"
                ></b-icon-cloud-upload>
                <b-icon-check2-circle
                  v-else-if="uploadValue === 100"
                ></b-icon-check2-circle>
                <b-spinner small label="Small Spinner" v-else></b-spinner>
                Thay đổi
              </b-button>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="profile-text-day-register my-3 px-2">
          <b-col align="left">Vai trò</b-col>
          <b-col align="right" v-if="user.role">{{ user.role.name }}</b-col>
        </b-row>
        <b-row class="profile-text-day-register my-3 px-2">
          <b-col align="left">Ngày đăng ký</b-col>
          <b-col align="right">{{ user.created_at | formatOnlyDate }}</b-col>
        </b-row>
        <b-row class="profile-text-day-register my-3 px-2">
          <b-col align="left">Trạng thái</b-col>
          <b-col align="right">{{
            user.status ? "Hoạt động" : "Bị khóa"
          }}</b-col>
        </b-row>
      </b-col>
      <b-col cols="12" sm="12" md="12" lg="7">
        <p class="profile-text-infomation">Thông tin người dùng</p>

        <b-form-group
          id="input-group-fullname"
          label="Họ và tên"
          label-for="input-fullname"
        >
          <b-form-input
            id="input-fullname"
            name="input-fullname"
            type="text"
            placeholder="Họ và tên"
            v-model="user.fullname"
            v-validate="'required|max:190'"
            :state="validateState('input-fullname')"
            aria-describedby="input-fullname-feedback"
            data-vv-as="họ và tên"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullname-feedback">
            {{ veeErrors.first("input-fullname") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-username"
          label="Tài khoản"
          label-for="input-username"
        >
          <b-form-input
            id="input-username"
            name="input-username"
            type="text"
            placeholder="Tài khoản"
            v-model="user.username"
            v-validate="'required|max:190'"
            :state="validateState('input-username')"
            aria-describedby="input-username-feedback"
            data-vv-as="tài khoản"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullname-feedback">
            {{ veeErrors.first("input-username") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-email"
          name="input-email"
          label="Địa chỉ email"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            type="text"
            placeholder="Địa chỉ email"
            size="sm"
            :value="user.email"
            disabled
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-phone"
          label="Số điện thoại"
          label-for="input-phone"
        >
          <b-form-input
            id="input-phone"
            name="input-phone"
            type="text"
            placeholder="Số điện thoại"
            v-model="user.phone"
            v-validate="'required|max:15'"
            :state="validateState('input-phone')"
            aria-describedby="input-phone-feedback"
            data-vv-as="số điện thoại"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullname-feedback">
            {{ veeErrors.first("input-phone") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-address"
          label="Địa chỉ"
          label-for="input-address"
        >
          <b-form-input
            id="input-address"
            name="input-address"
            type="text"
            placeholder="Địa chỉ"
            v-model="user.address"
            v-validate="'required|max:190'"
            :state="validateState('input-address')"
            aria-describedby="input-address-feedback"
            data-vv-as="địa chỉ"
            size="sm"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullname-feedback">
            {{ veeErrors.first("input-address") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group align="right" class="mb-2">
          <b-button type="sumbit" size="sm" class="button-confirm">
            <b-icon-check-circle></b-icon-check-circle>
            Cập nhật
          </b-button>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      error: false,
      imageData: null,
      uploadValue: 0,
      uploaded: false,
      loaderImage: false,
    };
  },
  methods: {
    update() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = true;
        } else {
          this.error = false;
          this.$toast.error("Vui lòng nhập đầy đủ thông tin.");
        }

        if (this.error) {
          try {
            this.$emit("onUpdateUser");
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
    previewImage(event) {
      this.loaderImage = true;
      this.uploaded = false;
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
      this.user.image = URL.createObjectURL(this.imageData);
      this.loaderImage = false;
    },
    onUpload() {
      if (this.uploaded) {
        this.$toast.error("Ảnh đã được tải lên.");
        return;
      }
      this.loaderImage = true;
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
            this.user.image = url;
            this.$emit("updateImage", url);
          });
          this.uploaded = true;
          this.loaderImage = false;
        }
      );
    },
  },
};
</script>

<style scoped>
.profile-text-infomation {
  font-size: 18px;
  color: rgb(0, 0, 0, 0.5);
}
.profile-text-day-register {
  font-size: 12px;
  color: rgb(0, 0, 0, 0.7);
}
.button-confirm {
  background-color: var(--red-color);
  border: 0;
}
.button-confirm:hover {
  background-color: var(--darkred-color);
}
</style>
