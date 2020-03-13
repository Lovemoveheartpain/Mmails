<template>
  <div>
    <el-container>
      <el-header class="hidden-xs-only">
        <el-tooltip class="float" effect="light" placement="bottom-start">
          <div>
            <i class="el-icon-user-solid"></i>
            欢迎, {{username}}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="yin" slot="content" @click="toLogin">
            <i class="el-icon-circle-close"></i>
            退出登录
          </div>
        </el-tooltip>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.localStorage.getItem("user"),
    };
  },
  methods: {
    toLogin() {
      window.localStorage.setItem("user", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-main {
  color: #333;
  height: 91.5vh;
}
.el-header {
  background-color: white;
  color: #333;
}
.float {
  float: right;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.yin {
  width: 150px;
  cursor: pointer;
}
</style>