<template>
  <div>
    <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
      <HomeLeftVue />
    </el-col>
    <el-col :xs="24">
      <el-container>
        <HomeLeftResponseVue />
        <el-col :xs="24">
          <HomeRightVue />
        </el-col>
      </el-container>
    </el-col>
  </div>
</template>

<script>
import business from "../network/index";
import HomeLeftVue from "../components/home/HomeLeft.vue";
import HomeLeftResponseVue from "../components/home/HomeLeftResponse.vue";
import HomeRightVue from "../components/home/HomeRight.vue";

export default {
  components: {
    HomeLeftVue,
    HomeLeftResponseVue,
    HomeRightVue
  }
};
</script>

<style lang="">
.el-col {
  background-color: #f3f3f3;
}
.is-active {
  background: #2DAFCB !important;
}
</style>