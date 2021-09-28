<template>
  <div>
    <b-carousel
      id="carousel-banner"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="/assets/images/banner/banner-0.jpg"
        class="img-fluid"
        alt="banner-0"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="/assets/images/banner/banner-1.jpg"
        class="img-fluid"
        alt="banner-1"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="/assets/images/banner/banner-2.jpg"
        class="img-fluid"
        alt="banner-2"
      ></b-carousel-slide>
      <!-- <b-carousel-slide
        img-src="/assets/images/banner/banner-3.jpg"
        class="img-fluid"
        alt="banner-3"
      ></b-carousel-slide> -->
      <b-carousel-slide
        img-src="/assets/images/banner/banner-4.jpg"
        class="img-fluid"
        alt="banner-4"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 2,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
<style scoped>
</style>
