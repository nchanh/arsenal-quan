<template>
  <div class="LayoutDefault">
    <header>
      <public-header></public-header>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <public-footer></public-footer>
    </footer>
  </div>
</template>

<script>
import PublicHeader from './PublicHeader.vue'
import PublicFooter from './PublicFooter.vue'

export default {
  components: { PublicHeader, PublicFooter }
};
</script>

<style scoped>

</style>
