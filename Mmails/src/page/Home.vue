<template>
  <div>
    <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
      <!-- <div style="width:100%;backgroundColor:red;height: 100vh;"></div> -->
      <el-aside width="100%">
        <h2 class="float" style="color:#2DAFCB">HAPPY</h2>
        <h2 style="color:white">MMALL</h2>
        <el-header>
          <button @click="toLogin">登录</button>
        </el-header>
        <el-col :span="24">
          <el-menu
            :default-active="pageIndex"
            class="el-menu-vertical-demo"
            background-color="#2B2E33"
            text-color="#fff"
            active-text-color="red"
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
          </el-menu>
        </el-col>
      </el-aside>
    </el-col>
    <el-col :xs="24">
      <el-container>
        <el-aside width="260px" class="hidden-xs-only">
          <h2 style="color:#2DAFCB">HAPPY</h2>
          <h2 style="color:white">MMALL</h2>
          <el-col :span="24">
            <el-menu
              :default-active="pageIndex"
              class="el-menu-vertical-demo"
              background-color="#2B2E33"
              text-color="#fff"
              active-text-color="red"
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
            </el-menu>
          </el-col>
        </el-aside>
        <el-col :xs="24">
          <el-container>
            <el-header class="hidden-xs-only">
              <button @click="toLogin">登录</button>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-col>
      </el-container>
    </el-col>
  </div>
</template>

<script>
import HomeLeftVue from "../components/home/HomeLeft.vue";
import business from "../network/index";

export default {
  components: {
    HomeLeftVue
  },
  computed: {
    pageIndex() {
      return this.$store.state.initNumber;
    }
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toNewRouter(pagename) {
      if (this.$route.path !== pagename) {
        this.$router.push(pagename);
      } else {
        this.$message("你还在当前页面没有离开");
      }
    }
  }
};
</script>

<style lang="" scoped>
h2 {
  padding-left: 0.9375rem;
  font-size: 1.875rem;
  margin-bottom: 0.625rem;
}
.el-header {
  background-color: white;
  color: #333;
  text-align: center;
}

.el-aside {
  padding-top: 0.625rem;
  background-color: #2b2e33;
  color: #333;
}

.el-main {
  color: #333;
  height: 91.5vh;
}
.el-col {
  background-color: #f3f3f3;
}
.float {
  float: left;
  margin-right: 0.625rem;
}
</style>