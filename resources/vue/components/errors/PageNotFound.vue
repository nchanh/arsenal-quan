<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">404</span>
          <div class="mb-4 lead">Không tìm thấy trang bạn đang tìm.</div>
          <router-link :to="{ name: 'home' }" class="btn btn-link text-danger">
            <b-icon-house></b-icon-house> Trở về trang chủ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.page-wrap {
  background: #dedede;
  min-height: 90vh;
}
</style>
