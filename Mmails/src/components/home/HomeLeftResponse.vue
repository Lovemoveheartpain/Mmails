<template>
  <el-aside width="260px" class="hidden-xs-only">
    <h2 style="color:#2DAFCB">HAPPY</h2>
    <h2 style="color:white">MMALL</h2>
    <el-col :span="24">
      <el-menu
        :default-active="pageIndex"
        class="el-menu-vertical-demo"
        background-color="#2B2E33"
        text-color="#fff"
        active-text-color="white"
        :collapse-transition="false"
      >
        <el-menu-item index="1" @click="toNewRouter('/')">
          <i class="el-icon-s-fold"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-claim"></i>
            <span>商品</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toNewRouter('/commodity')" index="2-1">商品管理</el-menu-item>
            <el-menu-item @click="toNewRouter('/category')" index="2-2">品类管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toNewRouter('/order')" index="3-1">订单管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toNewRouter('/user')" index="4-1">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-wallet"></i>
            <span>图表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toNewRouter('/echarts')" index="5-1">Echarts</el-menu-item>
            <el-menu-item @click="toNewRouter('/map')" index="5-2">地图</el-menu-item>
            <el-menu-item @click="toNewRouter('/international')" index="5-3">国际化</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
export default {
  computed: {
    pageIndex() {
      return this.$store.state.initNumber;
    }
  },
  methods: {
    toNewRouter(pagename) {
      if (this.$route.path !== pagename) {
        this.$router.push(pagename);
        this.$store.commit("setUserNumber", 1);
        this.$store.commit("setOrderNumber", 1);
        this.$store.commit("setCommodityNumber", 1);
      } else {
        this.$message("你还在当前页面没有离开");
      }
    }
  }
};
</script>

<style scoped>
h2 {
  padding-left: 0.9375rem;
  font-size: 1.875rem;
  margin-bottom: 0.625rem;
}

.el-aside {
  padding-top: 0.625rem;
  background-color: #2b2e33;
  color: #333;
}
</style>