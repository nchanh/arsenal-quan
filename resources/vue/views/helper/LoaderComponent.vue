<template>
  <div class="dialog-background">
    <div class="dialog-loading-wrapper">
      <div class="lds-hourglass"></div>
    </div>
  </div>
</template>
<script>
export default {
};
</script>

<style scoped>
.dialog-background{
    background: none repeat scroll 0 0 rgba(255, 0, 0, 0.1);
    height: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
}
.dialog-loading-wrapper {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
    border: 0 none;
    height: 100px;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    position: fixed;
    top: 50%;
    width: 100px;
    z-index: 9999999;
}
.dialog-loading-icon {
    background-color: #FFFFFF !important;
    border-radius: 13px;
    display: block;
    height: 100px;
    line-height: 100px;
    margin: 0;
    padding: 1px;
    text-align: center;
    width: 100px;
}
.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>>
