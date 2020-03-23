<template>
  <div class="title">
    <slot name="title"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  width: 70%;
  height: 20px;
  min-width: 100px;
  background: url("../../assets/images/tips.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  color: white;
  font-size: 14px;
  margin: 10px 0px;
}
</style>