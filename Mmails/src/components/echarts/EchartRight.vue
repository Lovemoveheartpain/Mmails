<template>
  <div class="echarts_right">
    <EchartsTitleVue>
      <span slot="title">全部订单</span>
    </EchartsTitleVue>
     <div class="echarts_right_top">
      
    </div>
    <EchartsTitleVue>
      <span slot="title">设备运行状态</span>
    </EchartsTitleVue>
     <div class="echarts_right_middle">
    </div>
    <EchartsTitleVue>
      <span slot="title">APP列表</span>
    </EchartsTitleVue>
    <div class="echarts_right_bototm">
      <div v-for="(item, index) in 8" :key="index">APP</div>
    </div>
  </div>
</template>
<script>
import EchartsTitleVue from "../Common/EchartsTitle.vue";

export default {
  components: {
    EchartsTitleVue
  }
};
</script>

<style scoped>
.echarts_right {
  width: 21%;
  padding-left: 1.5%;
  padding-right: 1.5%;
  height: 100%;
  /* background: gray; */
}
.echarts_right_top {
  width: 100%;
  height: 30%;
  background: pink;
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.echarts_right_middle {
  width: 100%;
  height: 30%;
  background: orangered;
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.echarts_right_bototm {
  width: 100%;
  height: 20%;
  /* background: khaki; */
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.echarts_right_bototm > div {
  width: 21%;
  height: 50%;
  background: url("../../assets/images/生产线效率底图.png") no-repeat center;
  background-size: 70% 70%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>