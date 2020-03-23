<template>
  <div class="echarts_container">
    <EchartHeaderVue />
    <div class="echart_contant">
      <EchartLeftVue />
      <EchartMIddleVue />
      <EchartRightVue />
    </div>
  </div>
</template>

<script>
import EchartHeaderVue from "../components/echarts/EchartHeader.vue";
import EchartLeftVue from "../components/echarts/EchartLeft.vue";
import EchartRightVue from "../components/echarts/EchartRight.vue";
import EchartMIddleVue from "../components/echarts/EchartMIddle.vue";

export default {
  components: {
    EchartHeaderVue,
    EchartMIddleVue,
    EchartRightVue,
    EchartLeftVue
  }
};
</script>

<style scoped>
.echarts_container {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/backs.png");
  background-size: 100vw 100vh;
}
.echart_contant {
  width: 100vw;
  height: 92vh;
  /* background-color: red; */
  display: inline-flex;
  justify-content: space-around;
}
</style>