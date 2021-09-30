<template>
  <b-col cols="12" sm="12" md="12" lg="4">
    <p class="profile-text-change-password">
      <b-form-checkbox v-model="statusChange" name="check-button" switch>
        Đổi mật khẩu
      </b-form-checkbox>
    </p>
    <transition name="slide-fade">
      <div v-if="statusChange">
        <b-form @submit.prevent="submit">
          <b-form-group id="input-group-password" label="Mật khẩu hiện tại">
            <b-input-group>
              <b-form-input
                id="input-password"
                name="input-password"
                v-model="passwords.password"
                :type="typePassword ? 'password' : 'text'"
                placeholder="Mật khẩu cũ"
                v-validate="'required|min:6'"
                :state="validateState('input-password')"
                aria-describedby="input-password-feedback"
                data-vv-as="mật khẩu hiện tại"
                size="sm"
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
              <b-form-invalid-feedback id="input-password-feedback">
                {{ veeErrors.first("input-password") }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group id="input-group-new-password" label="Mật khẩu mới">
            <b-input-group>
              <b-form-input
                id="input-new-password"
                name="input-new-password"
                v-model="passwords.newPassword"
                :type="typeNewPassword ? 'password' : 'text'"
                placeholder="Mật khẩu mới"
                v-validate="'required|min:6'"
                :state="validateState('input-new-password')"
                aria-describedby="input-new-password-feedback"
                data-vv-as="mật khẩu mới"
                size="sm"
                ref="newPassword"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  @click="showNewPassword"
                  variant="outline-secondary"
                  size="sm"
                >
                  <b-icon-eye v-if="typeNewPassword"></b-icon-eye>
                  <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill>
                </b-button>
              </b-input-group-append>
              <b-form-invalid-feedback id="input-new-password-feedback">
                {{ veeErrors.first("input-new-password") }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="input-group-confirm-new-password"
            label="Nhập lại mật khẩu mới"
          >
            <b-input-group>
              <b-form-input
                id="input-confirm-new-password"
                name="input-confirm-new-password"
                v-model="passwords.confirmNewPassword"
                :type="typeConfirmNewPassword ? 'password' : 'text'"
                placeholder="Nhập lại mật khẩu mới"
                size="sm"
                v-validate="'required|min:6|confirmed:newPassword'"
                :state="validateState('input-confirm-new-password')"
                aria-describedby="input-confirm-new-password-feedback"
                data-vv-as="nhập lại mật khẩu mới"
                class="col-11"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  @click="showNewConfirmPassword"
                  variant="outline-secondary"
                  size="sm"
                >
                  <b-icon-eye v-if="typeConfirmNewPassword"></b-icon-eye>
                  <b-icon-eye-slash-fill v-else></b-icon-eye-slash-fill>
                </b-button>
              </b-input-group-append>
              <b-form-invalid-feedback id="input-confirm-new-password-feedback">
                {{ veeErrors.first("input-confirm-new-password") }}
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group align="right">
            <b-button type="submit" size="sm" class="button-confirm">
              <b-icon-check-circle></b-icon-check-circle>
              Thay đổi
            </b-button>
          </b-form-group>
        </b-form>
      </div>
    </transition>
  </b-col>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      passwords: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      error: false,
      statusChange: false,
      typePassword: true,
      typeNewPassword: true,
      typeConfirmNewPassword: true,
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.error = true;
        } else {
          this.error = false;
          this.$toast.error("Vui lòng nhập đầy đủ thông tin.");
        }

        if (this.error) {
          try {
            let passwordInput = {
              userId: this.user.id,
              old_password: this.passwords.password,
              new_password: this.passwords.newPassword,
              password: this.passwords.confirmNewPassword,
            };
            this.$emit("onChangePassword", passwordInput);
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
    showPassword() {
      this.typePassword = !this.typePassword;
    },
    showNewPassword() {
      this.typeNewPassword = !this.typeNewPassword;
    },
    showNewConfirmPassword() {
      this.typeConfirmNewPassword = !this.typeConfirmNewPassword;
    },
    resetPasswords() {
      this.statusChange = false;
      this.passwords.password = "";
      this.passwords.newPassword = "";
      this.passwords.confirmNewPassword = "";
    },
  },
};
</script>

<style scoped>
.profile-text-change-password {
  font-size: 18px;
  color: rgb(0, 0, 0, 0.5);
}
.button-confirm {
  background-color: var(--red-color);
  border: 0;
}
.button-confirm:hover {
  background-color: var(--darkred-color);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
