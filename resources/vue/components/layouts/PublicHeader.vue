<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-app">
      <b-container>
        <b-navbar-brand :to="{ name: 'home' }">Arsenal Quán</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              v-for="(item, index) in getMinCategories"
              :key="index"
              :to="{
                name: 'searchCategory',
                params: { categorySlug: item.slug },
              }"
              class="nav-cateogry"
              >{{ item["name_vi"] }}</b-nav-item
            >
            <div @mouseover="onOver" @mouseleave="onLeave">
              <b-nav-item-dropdown ref="dropdownCategories" no-caret left>
                <template #button-content>
                  Tất cả <b-icon icon="list"></b-icon>
                </template>
                <b-dropdown-item
                  v-for="(item, index) in categories"
                  :key="index"
                  :to="{
                    name: 'searchCategory',
                    params: { categorySlug: item.slug },
                  }"
                  >{{ item["name_vi"] }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </div>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <div class="hd-search">
              <input
                type="text"
                v-model="keyword"
                v-on:keyup.enter="onSearch"
                placeholder="arsenal . . ."
              />
            </div>
            <b-nav-item>
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
                      {{ getFullname }}
                      <b-icon-chevron-down></b-icon-chevron-down>
                    </span>
                  </template>
                  <b-dropdown-item :to="{ name: 'profileUser' }">
                    Hồ sơ cá nhân
                  </b-dropdown-item>
                  <b-dropdown-item :to="{ name: 'postManager' }">
                    Quản lý bài viết
                  </b-dropdown-item>
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
      keyword: "",
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
      return this.categories.slice(0, 4);
    },
  },
  methods: {
    ...mapActions("auth", ["LogOut"]),
    ...mapActions("category", ["getCategories"]),
    ...mapActions("user", ["setUserLoggedEmpty"]),
    async layoutLogout() {
      try {
        await this.LogOut();
        await this.setUserLoggedEmpty();
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
    callCategoryPosts(slug) {
      this.$router.push({ name: "postDetail", params: { Pslug: slug } });
    },
    onSearch() {
      if (this.$route.params.keyword !== this.keyword) {
        if (this.keyword == "") {
          this.$toast.info("Vui lòng nhập thông tin cần tìm.");
        } else {
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
          });
        }
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
.hd-search {
  padding-top: 10px;
  margin-right: 5px;
}
.hd-search:after {
  content: "";
  background: white;
  width: 2px;
  height: 16px;
  position: absolute;
  top: 37px;
  transform: rotate(135deg);
}

.hd-search > input {
  color: white;
  font-size: 15px;
  background: transparent;
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 2px white;
  outline: none;
  border-radius: 35px;
  transition: width 0.5s;
}

.hd-search > input::placeholder {
  color: #efefef;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.hd-search > input:focus::placeholder {
  opacity: 1;
}

.hd-search > input:focus,
.hd-search > input:not(:placeholder-shown) {
  width: 175px;
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
@media all and (max-width: 991px) {
  .hd-search:after {
    display: none;
  }
}
</style>
