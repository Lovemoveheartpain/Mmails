<template>
  <el-header>
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
</template>

<script>
export default {
  data() {
    return {
      username: window.localStorage.getItem("user")
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
.el-header {
  background-color: white;
  color: #333;
}
.float {
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.yin {
  width: 150px;
  cursor: pointer;
}
</style>