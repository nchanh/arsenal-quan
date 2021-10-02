<template>
  <div>
    <b-card
      no-body
      class="hot-post mt-2"
      @click="onPostDetail(getPostFirst.slug)"
    >
      <b-row no-gutters>
        <b-col md="8">
          <b-card-img
            :src="getPostFirst.thumbnail || '/assets/images/banner/banner-1.jpg'"
            :alt="getPostFirst.slug"
            class="card-image rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="4">
          <b-card-body>
            <b-card-text>
              <span
                class="hp-title-cateogry"
                v-if="getPostFirst.category"
                v-text="getPostFirst.category.name_vi"
              ></span>
              <b-card-title class="hp-title">
                {{ getPostFirst.title }}
              </b-card-title>
              <b-card-text class="hp-short-description">
                {{ getPostFirst.short_description }}
              </b-card-text>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="mt-2">
      <b-col
        sm="12"
        md="4"
        lg="4"
        cols="12"
        v-for="(item, index) in getPostSubsist"
        :key="index"
      >
        <b-card
          no-body
          class="overflow-hidden post-cart"
          @click="onPostDetail(item.slug)"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img-lazy
                :src="item.thumbnail || '/assets/images/Logo-AQ-red.png'"
                :alt="item.slug"
                class="rounded-0 post-img"
              ></b-card-img-lazy>
            </b-col>
            <b-col md="6" class="post-text">
              <b-card-body>
                <span
                  class="post-title-cateogry"
                  v-if="item.category"
                  v-text="item.category.name_vi"
                ></span>
                <b-card-title class="post-title">
                  {{ item.title }}
                </b-card-title>
                <b-card-text class="post-short-description">
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
    posts: Array,
  },
  computed: {
    getPostFirst() {
      return this.posts[0];
    },
    getPostSubsist() {
      return this.posts.slice(1, 4);
    },
  },
  methods: {
    onPostDetail(slug) {
      this.$emit("postDetail", slug);
    },
  },
};
</script>

<style scoped>
.hot-post {
  border-top: var(--red-color) solid 3px;
}
.hot-post:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.hp-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 14px;
  text-transform: uppercase;
}
.hp-title {
  font-size: 26px;
  margin: 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hp-short-description {
  color: rgba(123, 123, 123);
  font-size: 18px;
  font-family: KanitLight;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-image {
  height: 400px;
}
.post-cart:hover {
  cursor: pointer;
  color: red;
  background-color: rgb(255, 0, 0, 0.045);
  box-shadow: rgba(191, 136, 136, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.post-cart {
  max-width: 540px;
}
.post-img {
  height: 215px;
  border-top: var(--red-color) solid 3px;
}
.post-text {
  border-top: var(--red-color) solid 3px;
}
.post-title-cateogry {
  color: rgb(95, 95, 95);
  font-size: 13px;
  text-transform: uppercase;
}
.post-title {
  font-size: 16px;
  margin: 2px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-short-description {
  color: rgba(123, 123, 123);
  font-size: 15px;
  font-family: KanitLight;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
