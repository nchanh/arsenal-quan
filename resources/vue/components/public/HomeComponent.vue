<template>
  <div>
    <b-container fluid>
      <carousel-component></carousel-component>
    </b-container>
    <b-container>
      <new-post-component></new-post-component>
    </b-container>
  </div>
</template>

<script>
import CarouselComponent from "../../views/home/Carousel.vue";
import NewPostComponent from "../../views/home/NewPosts.vue";

export default {
  components: {
    CarouselComponent,
    NewPostComponent,
  },
};
</script>

<style></style>
