<template>
  <layout-public>
    <b-container fluid>
      <carousel-component></carousel-component>
    </b-container>
    <b-container>
      <new-post-component></new-post-component>
    </b-container>
  </layout-public>
</template>

<script>
import LayoutPublic from "../layouts/LayoutPublic.vue";
import CarouselComponent from "../../views/home/Carousel.vue";
import NewPostComponent from "../../views/home/NewPosts.vue";

export default {
  components: {
    LayoutPublic,
    CarouselComponent,
    NewPostComponent,
  },
};
</script>

<style></style>
