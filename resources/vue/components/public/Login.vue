<template>
  <div class="vue-tempalte">
    <form @submit.prevent="submit">
      <div class="d-flex justify-content-center">
        <img src="/assets/images/Logo-AQ-red.png" alt="arsernal-quan" />
      </div>
      <h4>Đăng nhập vào Arsenal Quán</h4>

      <b-form-group
        id="input-username"
        label="Tài khoản hoặc địa chi email"
        label-for="input-username"
      >
        <b-form-input
          type="text"
          id="input-username"
          name="input-username"
          v-model="user.username"
          v-validate="'required|min:6|max:25'"
          :state="validateState('input-username')"
          aria-describedby="input-username-feedback"
          data-vv-as="username"
          class="form-control form-control-md"
        ></b-form-input>
        <b-form-invalid-feedback id="input-username-feedback">{{
          veeErrors.first("input-username")
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-password"
        label="Mật khẩu"
        label-for="input-password"
      >
        <b-input-group>
          <b-form-input
            :type="typePassword  ? 'password' : 'text'"
            id="input-password"
            name="input-password"
            v-model="user.password"
            v-validate="'required|min:6|max:50'"
            :state="validateState('input-password')"
            aria-describedby="input-password-feedback"
            data-vv-as="password"
            class="form-control form-control-md"
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

      <button type="submit" class="btn btn-lg btn-block btn-submit">
        Đăng nhập
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
        username: "",
        password: "",
      },
      error: true,
      typePassword: true,
    };
  },
  methods: {
    ...mapActions("auth", ["LogIn"]),
    ...mapActions("user", ["getUserLogged"]),
    async submit() {
      await this.$validator.validateAll().then((result) => {
        if (!result) this.error = false;
        else this.error = true;
      });

      if (this.error) {
        const User = new FormData();
        User.append("username", this.user.username);
        User.append("password", this.user.password);

        try {
          await this.LogIn(User);
          await this.getUserLogged();
          this.$toast.success("Bạn đã đăng nhập thành công.");
          this.$router.push({ name: "home" });
        } catch (error) {
          this.$toast.error("Tài khoản hoặc mật khẩu không đúng.");
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
    showPassword() {
      this.typePassword = !this.typePassword;
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
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
  margin-top: 35px;
  margin-bottom: 65px;
}
.vue-tempalte img {
  width: 40%;
  margin-bottom: 10px;
}
.forgot-password {
  font-size: 13px;
  color: var(--dark-color);
  margin: 0;
}
.forgot-password a {
  color: var(--blue-color);
}
.forgot-password a:hover {
  color: var(--dark-color);
  text-decoration: none;
}
.btn-submit {
  background-color: var(--red-color);
  color: #fff;
  margin-bottom: 10px;
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
