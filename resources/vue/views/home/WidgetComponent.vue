<template>
  <div>
    <div class="widget">
      <iframe
        src="https://www.scoreaxis.com/widget/team-info/19?bodyBackground=%23FFFFFF&color=%23313934&widgetBorder=1&header=1"
        width="100%"
        height="349"
      ></iframe>
    </div>
    <div class="widget">
      <iframe
        src="https://www.scoreaxis.com/widget/standings-widget/8?columns=1%2C1%2C1%2C1%2C1%2C1%2C0%2C0%2C1&tabs=1&header=1&bg=%23FFFFFF&color=%23313934"
        width="100%"
        height="534"
      ></iframe>
    </div>
    <div class="widget">
      <iframe
        src="https://www.scoreaxis.com/widget/league-top-players/8?tabs=1&bg=%23FFFFFF&color=%23313934&teamLogo=1&bodyBackground=%23ffffff"
        width="100%"
        height="375"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.widget {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px;
  background: rgb(255, 255, 255);
  width: 100%;
  margin-bottom: 20px;
}
.widget iframe {
  border: none;
}
</style>
