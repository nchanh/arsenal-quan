<template>
  <div class="vue-tempalte">
    <form @submit.prevent="submit">
      <h4>Đăng ký tài khoản Arsenal Quán</h4>

      <b-form-group
        id="input-fullname"
        label="Họ và tên"
        label-for="input-fullname"
      >
        <b-form-input
          type="text"
          id="input-fullname"
          name="input-fullname"
          v-model="user.fullname"
          v-validate="'required|min:6|max:50'"
          :state="validateState('input-fullname')"
          aria-describedby="input-fullname-feedback"
          data-vv-as="Fullname"
          class="form-control form-control-md"
          placeholder="Họ và tên"
        ></b-form-input>
        <b-form-invalid-feedback id="input-fullname-feedback">{{
          veeErrors.first("input-fullname")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-email"
        label="Địa chỉ email"
        label-for="input-email"
      >
        <b-form-input
          type="email"
          id="input-email"
          name="input-email"
          v-model="user.email"
          v-validate="'required|email|min:6|max:50'"
          :state="validateState('input-email')"
          aria-describedby="input-email-feedback"
          data-vv-as="email"
          class="form-control form-control-md"
          placeholder="Địa chỉ email"
        ></b-form-input>
        <b-form-invalid-feedback id="input-email-feedback">{{
          veeErrors.first("input-email")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-password"
        label="Mật khẩu"
        label-for="input-password"
      >
        <b-input-group>
          <b-form-input
            :type="typePassword ? 'password' : 'text'"
            id="input-password"
            name="input-password"
            v-model="user.password"
            v-validate="'required|min:6|max:50'"
            :state="validateState('input-password')"
            aria-describedby="input-password-feedback"
            data-vv-as="password"
            class="form-control form-control-md"
            placeholder="Mật khẩu"
            ref="user.password"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              @click="showPassword"
              variant="outline-secondary"
              size="sm"
            >
              <b-icon-eye v-if="typePassword"></b-icon-eye>
              <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill>
            </b-button>
          </b-input-group-append>
          <b-form-invalid-feedback id="input-password-feedback">{{
            veeErrors.first("input-password")
          }}</b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>

      <b-form-group
        id="input-password_confirmation"
        label="Nhập lại mật khẩu"
        label-for="input-password_confirmation"
      >
        <b-input-group>
          <b-form-input
            :type="typeConfirmPassword ? 'password' : 'text'"
            id="input-password_confirmation"
            name="input-password_confirmation"
            v-model="user.password_confirmation"
            v-validate="'required|min:6|max:50|confirmed:user.password'"
            :state="validateState('input-password_confirmation')"
            aria-describedby="input-password_confirmation-feedback"
            data-vv-as="confirm password"
            class="form-control form-control-md"
            placeholder="Nhập lại mật khẩu"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              @click="showConfirmPassword"
              variant="outline-secondary"
              size="sm"
            >
              <b-icon-eye v-if="typeConfirmPassword"></b-icon-eye>
              <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill>
            </b-button>
          </b-input-group-append>
          <b-form-invalid-feedback id="input-password_confirmation-feedback">{{
            veeErrors.first("input-password_confirmation")
          }}</b-form-invalid-feedback>
        </b-input-group>
      </b-form-group>

      <button type="submit" class="btn btn-lg btn-block btn-submit">
        <span>Đăng ký</span>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      error: true,
      typePassword: true,
      typeConfirmPassword: true,
    };
  },
  methods: {
    ...mapActions("auth", ["Register"]),
    ...mapActions("user", ["getUserLogged"]),
    async submit() {
      await this.$validator.validateAll().then((result) => {
        if (!result) this.error = false;
        else this.error = true;
      });

      if (this.error) {
        try {
          await this.Register(this.user);
          await this.getUserLogged();
          this.$toast.success("Bạn đã đăng ký tài khoản thành công.");
          this.$router.push({ name: "home" });
        } catch (error) {
          this.$toast.error("Địa chỉ email đã tồn tại.");
        }
      }
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
    getUsername(email) {
      const myArr = email.split("@");
      return myArr[0];
    },
    showPassword() {
      this.typePassword = !this.typePassword;
    },
    showConfirmPassword() {
      this.typeConfirmPassword = !this.typeConfirmPassword;
    },
  },
};
</script>

<style scoped>
h4 {
  text-align: center;
  margin-bottom: 15px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
}
.vue-tempalte {
  height: 100%;
  width: 550px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  margin-top: 35px;
  margin-bottom: 65px;
}
.btn-submit {
  background-color: var(--red-color);
  color: #fff;
  margin-top: 25px;
}
.btn-submit:hover {
  background-color: var(--darkred-color);
}
@media only screen and (max-width: 576px) {
  .vue-tempalte {
    width: 100%;
  }
}
</style>
