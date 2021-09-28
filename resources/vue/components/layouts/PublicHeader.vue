<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-app">
      <b-container>
        <b-navbar-brand :to="{ name: 'home' }">Arsenal Quán</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              href="#"
              v-for="(item, index) in getMinCategories"
              :key="index"
              class="nav-cateogry"
              >{{ item["name_vi"] }}</b-nav-item
            >
            <div @mouseover="onOver" @mouseleave="onLeave">
              <b-nav-item-dropdown ref="dropdownCategories" no-caret left>
                <template #button-content>
                  Tất cả <b-icon icon="list"></b-icon>
                </template>
                <b-dropdown-item
                  href="#"
                  v-for="(item, index) in categories"
                  :key="index"
                  >{{ item["name_vi"] }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </div>
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
                    <span class="text-profile">
                      {{ getFullname }} <b-icon-chevron-down></b-icon-chevron-down>
                      </span>
                  </template>
                  <b-dropdown-item href="#">Hồ sơ cá nhân</b-dropdown-item>
                  <b-dropdown-item :to="{ name: 'postManager' }">Quản lý bài viết</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item
                    href="javascript:void(0);"
                    @click="layoutLogout"
                  >
                    Đăng xuất
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <div v-else>
                <b-button
                  :to="{ name: 'login' }"
                  class="btn btn-outline-light navbar-nav-btn"
                  >Đăng nhập</b-button
                >
                <b-button
                  :to="{ name: 'register' }"
                  class="btn btn-outline-light navbar-nav-btn"
                  >Đăng ký</b-button
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
  data() {
    return {
      min_categories: {},
    };
  },
  created: function () {
    this.getCategories();
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      getFullname: "auth/getFullname",
      categories: "category/getCategories",
    }),
    isLoggedIn: function () {
      return this.isAuthenticated;
    },
    getMinCategories() {
      return this.categories.slice(0, 5);
    },
  },
  methods: {
    ...mapActions("auth", ["LogOut"]),
    ...mapActions("category", ["getCategories"]),
    async layoutLogout() {
      try {
        await this.LogOut();
        this.$toast.info("Bạn đã đăng xuất khỏi hệ thống.");
        this.$router.push({ name: "login" });
      } catch (error) {
        this.$toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    },
    onOver() {
      this.$refs.dropdownCategories.visible = true;
    },
    onLeave() {
      this.$refs.dropdownCategories.visible = false;
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
