<template>
  <layout-public>
    <div class="flex-center position-ref full-height">
      <div class="content">
        <div class="m-b-md">
          <h2 class="title m-b-md">Arsenal Quan</h2>
          <h3>Say hello everybody</h3>
        </div>
      </div>
    </div>
  </layout-public>
</template>

<script>
import LayoutPublic from "../layouts/LayoutPublic.vue";

export default {
  components: { LayoutPublic },
};
</script>

<style scoped>
.full-height {
  height: 100vh;
}
.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}
.position-ref {
  position: relative;
}
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}
.content {
  text-align: center;
}
.title {
  font-size: 60px;
}
.links > a {
  color: #636b6f;
  padding: 0 25px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}
.m-b-md {
  margin-bottom: 30px;
  color: #000000;
}
</style>
