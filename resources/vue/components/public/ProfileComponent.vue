<template>
  <b-container>
    <h3 class="profile-title">
      <b-icon-person-circle></b-icon-person-circle>
      Hồ sơ người dùng
    </h3>
    <b-card class="mb-5">
      <b-row>
        <update-profile
          :user="user"
          @updateImage="updateImage"
          @onUpdateUser="onUpdateUser"
        ></update-profile>
        <change-password
          :user="user"
          @onChangePassword="onChangePassword"
          ref="changePassword"
        ></change-password>
      </b-row>
    </b-card>
    <loader-component v-if="loader"></loader-component>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UpdateProfile from "../../views/profile/UpdateProfileComponent.vue";
import ChangePassword from "../../views/profile/ChangePasswordComponent.vue";
import LoaderComponent from "../../views/helper/LoaderComponent.vue";

export default {
  components: {
    UpdateProfile,
    ChangePassword,
    LoaderComponent,
  },
  data() {
    return {
      user: {},
      loader: false,
    };
  },
  created() {
    this.getUserLogged();
  },
  mounted() {
    this.user = this.userLogged;
  },
  computed: {
    ...mapGetters({
      userLogged: "user/getUserLogged",
      error: "user/getError",
    }),
  },
  methods: {
    ...mapActions("user", [
      "getUserLogged",
      "setUserLoggedEmpty",
      "updateUser",
      "updateImageUser",
      "changePassword",
    ]),
    async updateImage(image) {
      let userInput = {
        id: this.user.id,
        image: image,
      };
      await this.updateImageUser(userInput).then(() => {
        if (this.error) {
          this.$toast.error("Đã xãy ra lỗi vui lòng thử lại.");
        }
      });
    },
    async onUpdateUser() {
      this.loader = true;
      let userInput = {
        id: this.user.id,
        fullname: this.user.fullname,
        username: this.user.username,
        phone: this.user.phone,
        address: this.user.address,
      };
      await this.updateUser(userInput).then(() => {
        if (this.error) {
          this.$toast.error("Tên tài khoản này đã được sử dụng.");
        } else {
          this.$toast.success("Bạn đã cập nhật thành công.");
        }
        this.loader = false;
      });
    },
    async onChangePassword(passwords) {
      this.loader = true;
      await this.changePassword(passwords).then(() => {
        if (this.error) {
          this.$toast.error("Mật khẩu hiện tại không đúng.");
        } else {
          this.$refs.changePassword.resetPasswords();
          this.$toast.success("Bạn đã thay đổi mật khẩu.");
        }
        this.loader = false;
      });
    },
  },
};
</script>

<style scoped>
.profile-title {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin: 15px 0;
  font-family: KanitMedium;
  text-transform: uppercase;
}
</style>
