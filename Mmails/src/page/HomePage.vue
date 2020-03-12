<template>
  <MainContainerVue>
    <span slot="name">首页</span>
    <el-row :gutter="40" slot="container">
      <el-col
        :xs="24"
        :sm="24"
        :md="8"
        :lg="8"
        v-for="(item, index) in init"
        :key="index"
        @click="toLink(item.route)"
      >
        <router-link :to="item.route">
          <div class="sol" :class="item.class">
            <p>{{item.name}}</p>
            <p>
              <i :class="item.icon"></i>
              {{item.number}}
            </p>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from "../components/Common/MainContainer.vue";
import business from "../network/index";

export default {
  data() {
    return {
      isA: true,
      init: [
        {
          name: "用户总数",
          number: 0,
          route: "/user",
          class: "sol_left",
          icon: "el-icon-user"
        },
        {
          name: "商品总数",
          number: 0,
          route: "/category",
          class: "sol_middle",
          icon: "el-icon-document"
        },
        {
          name: "订单总数",
          number: 0,
          route: "/order",
          class: "sol_right",
          icon: "el-icon-s-claim"
        }
      ]
    };
  },
  components: {
    MainContainerVue
  },
  methods: {
    statistic() {
      let i = 0;
      business
        .statistic()
        .then(res => {
          if (res.data.status === 0) {
            for (const key in res.data.data) {
              this.init[i++].number = res.data.data[key];
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.statistic();
  }
};
</script>

<style scoped>
.sol {
  width: 100%;
  height: 150px;
  color: white;
  text-align: center;
  font-size: 30px;
  line-height: 75px;
}
.sol:hover {
  color: #333333;
  transform: scale(1.1);
  transition: all 500ms;
}
.sol_left {
  background-color: #f0ad4e;
}
.sol_middle {
  background-color: #5cb85c;
}
.sol_right {
  background-color: #4cb1cf;
}
</style>