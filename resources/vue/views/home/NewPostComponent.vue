<template>
  <div>
    <b-row class="new-post">
      <b-col
        class="py-2 new-post-image"
        sm="12"
        md="6"
        lg="6"
        cols="12"
        v-for="(item, index) in posts"
        :key="index"
      >
        <b-card
          no-body
          class="overflow-hidden new-post-cart"
          @click="onPostDetail(item.slug)"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img-lazy
                :src="item.thumbnail || '/assets/images/Logo-AQ-red.png'"
                :alt="item.slug"
                class="rounded-0 new-post-img"
              ></b-card-img-lazy>
            </b-col>
            <b-col md="6" class="new-post-text">
              <b-card-body class="np-card-body">
                <span
                  class="np-title-cateogry"
                  v-if="item.category"
                  v-text="item.category.name_vi"
                ></span>
                <b-card-title class="new-post-title">
                  <span>{{ item.title }}</span>
                </b-card-title>
                <b-card-text class="new-post-short-description">
                  {{ item.short_description }}
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  methods: {
    onPostDetail(slug) {
      this.$emit("postDetail", slug);
    }
  },
};
</script>

<style scoped>
.new-post-cart:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.new-post-cart {
  max-width: 540px;
}
.new-post-title {
  font-size: 16px;
  margin: 2px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.new-post-short-description {
  color: rgba(123, 123, 123);
  font-size: 15px;
  font-family: KanitLight;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.new-post-img {
  height: 215px;
  border-top: var(--red-color) solid 3px;
}
.new-post-text {
  border-top: var(--red-color) solid 3px;
}
.np-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
</style>
