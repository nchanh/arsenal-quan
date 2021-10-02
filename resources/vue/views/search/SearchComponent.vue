<template>
  <div>
    <b-card
      class="card-image mb-3"
      v-for="(item, index) in posts"
      :key="index"
      :img-src="item.thumbnail || '/assets/images/Logo-AQ-red.png'"
      img-alt="item.slug"
      img-left
      @click="onPostDetail(item.slug)"
    >
      <b-card-text class="body-text">
        <span class="category">{{ item.category.name_vi }}</span>
        <span class="card-body-title">
          {{ item.title }}{{ item.title }}{{ item.title }}{{ item.title }}
        </span>
        <span class="card-body-sd"
          >{{ item.short_description }}{{ item.short_description
          }}{{ item.short_description }}{{ item.short_description }}</span
        >
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    posts: Array,
  },
  methods: {
    onPostDetail(slug) {
      this.$emit("postDetail", slug);
    }
  }
};
</script>
<style scoped>
.card-image:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.category {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
.card-body-title {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-body-sd {
  font-size: 15px;
  font-family: KanitLight;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-img-left {
  padding-top: 5px;
  height: 150px;
}
.card-body-sd {
  color: rgb(123, 123, 123);
}
</style>
