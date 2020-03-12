<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus" >
*
  padding 0px
  margin 0px
  list-style none
  text-decoration none
#app
  background-color #f3f3f3
</style>
