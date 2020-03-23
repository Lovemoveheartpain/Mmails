<template>
  <div class="echarts_middle">
    <div class="echarts_middle_top">
      <span class="echarts_middle_top_span">{{time}}</span>
      安全第一，质量为本!
    </div>
    <div class="echarts_middle_middle">
      <div class="echarts_middle_middle_num">100</div>
      <div class="echarts_middle_middle_wen">生产线状态</div>
      <div class="echarts_middle_middle_nei">
        <p>负载:45665</p>
        <p>功耗:1233W</p>
      </div>
    </div>
    <div class="echarts_middle_bottom">
      <div>
        <p>
          生产线效率
          <span>
            <span>年</span>
            <span>月</span>
            <span>周</span>
            <span>日</span>
          </span>
        </p>
        <div id="echarts_middle_id1"></div>
      </div>
      <div>
        <p>
          生产合格率
          <span>
            <span>年</span>
            <span>月</span>
            <span>周</span>
            <span>日</span>
          </span>
        </p>
        <div id="echarts_middle_id2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: new Date().toLocaleString(),
      option: {
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            lineStyle: {
              color: "white",
              width: 2
            }
          }
        },
        yAxis: {
          type: "value",
          name: "效率",
          axisLine: {
            lineStyle: {
              color: "white",
              width: 2
            }
          }
        },
        series: [
          {
            data: [0, 20, 20, 40, 40, 70, 80],
            type: "line"
          }
        ]
      }
    };
  },
  methods: {
    echarts_middle_id1() {
      let main1 = document.getElementById("echarts_middle_id1");
      var myChart1 = this.$echarts.init(main1);
      myChart1.setOption(this.option);
    },
    echarts_middle_id2() {
      let main2 = document.getElementById("echarts_middle_id2");
      var myChart2 = this.$echarts.init(main2);
      myChart2.setOption(this.option);
    }
  },
  mounted() {
    this.echarts_middle_id1();
    this.echarts_middle_id2();
  }
};
</script>

<style scoped>
.echarts_middle {
  width: 48%;
  height: 100%;
  padding-left: 1%;
  padding-right: 1%;
  /* background: lightsalmon; */
}
.echarts_middle_top_span {
  color: white;
  position: absolute;
  left: 5px;
  top: 5px;
  font-size: 14px;
}
.echarts_middle_top {
  width: 100%;
  height: 7%;
  background: url("../../assets/images/年月日框.png") no-repeat;
  background-size: 100% 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: aqua;
  position: relative;
}
.echarts_middle_middle {
  width: 100%;
  height: 55%;
  background: url("../../assets/images/生产线状态.png") no-repeat center;
  background-size: 45% 90%;
  display: inline-flex;
  justify-content: center;
  position: relative;
}
.echarts_middle_bottom {
  width: 100%;
  height: 35%;
  /* background-color: greenyellow; */
  display: inline-flex;
  justify-content: space-between;
}
.echarts_middle_bottom > div {
  padding: 1%;
  width: 46%;
  height: 98%;
  background: url("../../assets/images/生产线效率底图.png") no-repeat;
  background-size: 100% 96%;
}
.echarts_middle_bottom > div > p {
  padding: 1%;
  width: 98%;
  height: 10%;
  background: url("../../assets/images/生产线效率标题.png") no-repeat;
  background-size: 100% 100%;
  font-size: 14px;
  color: white;
}
.echarts_middle_bottom > div > p > span {
  display: block;
  float: right;
  width: 50%;
  height: 100%;
  background: url("../../assets/images/年月日框.png") no-repeat;
  background-size: 100% 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
}
.echarts_middle_bottom > div > div {
  width: 100%;
  height: 90%;
}
.echarts_middle_middle_num {
  height: 30px;
  width: 100px;
  text-align: center;
  font-size: 30px;
  color: white;
  position: absolute;
  top: 40%;
}
.echarts_middle_middle_wen {
  height: 25px;
  width: 80px;
  line-height: 25px;
  background: #162346;
  text-align: center;
  color: aqua;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid aqua;
  position: absolute;
  top: 55%;
}
.echarts_middle_middle_nei {
  width: 120px;
  height: 48px;
  line-height: 24px;
  font-size: 14px;
  color: aqua;
  text-align: center;
  background: url("../../assets/images/负载功耗.png") center;
  background-size: 100% 100%;
  position: absolute;
  bottom: 20%;
}
</style>