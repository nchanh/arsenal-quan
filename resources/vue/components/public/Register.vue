<template>
  <layout-public>
    <div class="vue-tempalte">
      <form @submit.prevent="submit">
        <h4>Sign up to Arsenal Quán</h4>

        <b-form-group
          id="input-fullname"
          label="Fullname"
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
            placeholder="Fullname"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullname-feedback">{{
            veeErrors.first("input-fullname")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-username"
          label="Username"
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
            placeholder="Username"
          ></b-form-input>
          <b-form-invalid-feedback id="input-username-feedback">{{
            veeErrors.first("input-username")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-email"
          label="Email address"
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
            placeholder="Email address"
          ></b-form-input>
          <b-form-invalid-feedback id="input-email-feedback">{{
            veeErrors.first("input-email")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-password"
          label="Password"
          label-for="input-password"
        >
          <b-form-input
            type="password"
            id="input-password"
            name="input-password"
            v-model="user.password"
            v-validate="'required|min:6|max:50'"
            :state="validateState('input-password')"
            aria-describedby="input-password-feedback"
            data-vv-as="password"
            class="form-control form-control-md"
            placeholder="Password"
            ref="user.password"
          ></b-form-input>
          <b-form-invalid-feedback id="input-password-feedback">{{
            veeErrors.first("input-password")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-password_confirmation"
          label="Confirm Password"
          label-for="input-password_confirmation"
        >
          <b-form-input
            type="password"
            id="input-password_confirmation"
            name="input-password_confirmation"
            v-model="user.password_confirmation"
            v-validate="'required|min:6|max:50|confirmed:user.password'"
            :state="validateState('input-password_confirmation')"
            aria-describedby="input-password_confirmation-feedback"
            data-vv-as="confirm password"
            class="form-control form-control-md"
            placeholder="Confirm Password"
          ></b-form-input>
          <b-form-invalid-feedback id="input-password_confirmation-feedback">{{
            veeErrors.first("input-password_confirmation")
          }}</b-form-invalid-feedback>
        </b-form-group>

        <button type="submit" class="btn btn-lg btn-block btn-submit">
          Sign Up
        </button>
      </form>
    </div>
  </layout-public>
</template>

<script>
import { mapActions } from "vuex";
import LayoutPublic from "../layouts/LayoutPublic.vue";
export default {
  components: { LayoutPublic },
  data() {
    return {
      user: {
        fullname: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    ...mapActions('auth', ['Register']),
    async submit() {
      this.$validator.validateAll().then((result) => {
        if (!result) return;
      });

      try {
        await this.Register(this.user);
        this.$toast.success("Successful account registration.");
        this.$router.push({ name: "home" });
      } catch (error) {
        var error = this.getErrorRequest(error.response.data.errors);
        this.$toast.error(error);
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
    getErrorRequest(error) {
      if (error["username"]) return error["username"][0];
      else return error["email"][0];
    },
  },
};
</script>

<style scoped>
h4 {
  text-align: center;
  margin-bottom: 30px;
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
