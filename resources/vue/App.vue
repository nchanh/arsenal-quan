<template>
  <div>
    <main>
      <router-view></router-view>
    </main>
    <div
      id="pagetop"
      class="fixed right-0 bottom-0"
      v-show="scY > 300"
      @click="toTop"
      title="Lên đầu trang"
    >
      <b-icon-caret-up-square></b-icon-caret-up-square>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scTimer: 0,
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
main {
  background-color: #f1f2f3;
}
#pagetop {
  position: fixed;
  bottom: 20px;
  right: 25px;
  font-size: 30px;
  z-index: 99;
  transition: 0.5s;
  cursor: pointer;
  color: rgb(255, 0, 0, 0.4);
}
#pagetop:hover {
  bottom: 15px;
  right: 20px;
  color: var(--red-color);
  font-size: 40px;
  transition: 0.4s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
