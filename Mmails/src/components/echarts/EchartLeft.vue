<template>
  <div class="echarts_left">
    <EchartsTitleVue>
      <span slot="title">总线设备状态</span>
    </EchartsTitleVue>
    <div class="echarts_left_top" id="echarts_left_top"></div>
    <EchartsTitleVue>
      <span slot="title">总线上下行数据量</span>
    </EchartsTitleVue>
    <div class="echarts_left_bottom" id="echarts_left_bottom_id"></div>
  </div>
</template>

<script>
import EchartsTitleVue from "../Common/EchartsTitle.vue";

export default {
  components: {
    EchartsTitleVue
  },
  data() {
    return {
      option1: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["上行流量", "下行流量"],
          textStyle: {
            color: "#ccc"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["4时", "8时", "12时", "16时", "20时", "24时"],
            axisLine: {
              lineStyle: {
                color: "white",
                width: 2
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "white",
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: "上行流量",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: "#4D3E7D"
            },
            color: ["#58afed"],
            data: [120, 132, 101, 134, 180, 130]
          },
          {
            name: "下行流量",
            type: "line",
            stack: "总量",
            areaStyle: {
              color: "#811648"
            },
            color: ["#E22018"],
            data: [220, 182, 191, 234, 250, 330]
          }
        ]
      },
      option3: {
        series: [
          {
            name: "图例占比",
            type: "pie",
            radius: [15, 60],
            center: ["50%", 150],
            roseType: "radius",
            sort: "ascending", // for funnel
            data: [],
            //标线的属性设置，以及显示的文字
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "设备名称\n{c}台",
                  textStyle: {
                    fontSize: 12
                  }
                },
                //标线长度，宽度
                labelLine: {
                  show: true,
                  length: 15,
                  lineStyle: {
                    width: 1
                  }
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option2: {
        title: {
          text: "接入设备占比",
          x: "center",
          y: "10",
          textStyle: {
            color: "#4CCBED",
            fontSize: 12
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 70],
            roseType: "radius",
            label: {
              show: false
            },
            data: [
              { value: 15, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" }
            ]
          }
        ],
        color: ["#D9C701", "#F38051", "#29A0F7", "#E7536B"]
      },
      list: [
        { name: "设备名称", value: 12 },
        { name: "设备名称", value: 15 },
        { name: "设备名称", value: 20 },
        { name: "设备名称", value: 25 }
      ]
    };
  },
  methods: {
    echarts_left_bottom() {
      let main1 = document.getElementById("echarts_left_bottom_id");
      var myChart1 = this.$echarts.init(main1);
      myChart1.setOption(this.option1);
    },
    echarts_left_top() {
      let main2 = document.getElementById("echarts_left_top");
      var myChart2 = this.$echarts.init(main2);
      myChart2.setOption(this.option2);
      var data = [];
      this.list.map((v, i) => {
        var obj = { value: v.value };
        data.push(obj);
      });
      this.option3.series[0].data = data;
      myChart2.setOption(this.option3);
    }
  },
  mounted() {
    this.echarts_left_bottom();
    this.echarts_left_top();
  }
};
</script>

<style scoped>
.echarts_left {
  width: 21%;
  padding-left: 1.5%;
  padding-right: 1.5%;
  height: 100%;
  /* background: pink; */
}
.echarts_left_top {
  width: 100%;
  height: 60%;
  background: url("../../assets/images/生产线效率底图.png");
  background-size: 100% 100%;
}
.echarts_left_bottom {
  width: 100%;
  height: 25%;
  background: url("../../assets/images/生产线效率底图.png");
  background-size: 100% 100%;
}
</style>