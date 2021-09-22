<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-app">
      <b-container>
        <b-navbar-brand :to="{ name: 'home' }">Arsenal Quán</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <div v-if="isLoggedIn">
                <b-dropdown
                  size="lg"
                  variant="link"
                  toggle-class="text-decoration-none p-0"
                  no-caret
                >
                  <template #button-content>
                    <b-img
                      rounded="circle"
                      class="image-profile"
                      src="/assets/images/Logo-AQ-red.png"
                      alt="Logo-AQ-red.png"
                    ></b-img>
                    <span v-text="getFullname" class="text-profile"></span>
                  </template>
                  <b-dropdown-item href="#">Action</b-dropdown-item>
                  <b-dropdown-item href="#">Another action</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item
                    href="javascript:void(0);"
                    @click="layoutLogout"
                  >
                    Logout
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <div v-else>
                <b-button
                  :to="{ name: 'login' }"
                  class="btn btn-outline-light navbar-nav-btn"
                  >Sign in</b-button
                >
                <b-button
                  :to="{ name: 'register' }"
                  class="btn btn-outline-light navbar-nav-btn"
                  >Sign up</b-button
                >
              </div>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      getFullname: "auth/getFullname",
    }),
    isLoggedIn: function () {
      return this.isAuthenticated;
    },
  },
  methods: {
    ...mapActions("auth", ["LogOut"]),
    async layoutLogout() {
      try {
        await this.LogOut();
        this.$toast.info("You have logged out of the system.");
        this.$router.push({ name: "login" });
      } catch (error) {
        this.$toast.error("An error occurred, please try again.");
      }
    },
  },
};
</script>

<style scoped>
.navbar-app {
  background-color: var(--red-color);
}
.navbar-nav-btn {
  background-color: var(--red-color);
}
.navbar-nav-btn:hover {
  background-color: #fff;
  color: black;
}
.image-profile {
  height: 30px;
}
.text-profile {
  color: white;
  font-size: 16px;
}
@media all and (min-width: 992px) {
  .navbar .nav-item .dropdown-menu {
    display: none;
  }
  .navbar .nav-item:hover .dropdown-menu {
    display: block;
  }
  .navbar .nav-item .dropdown-menu {
    margin-top: 0;
  }
}
</style>
