<template>
  <div class="col">
    <el-col :xs="24" :sm="24" :md="10" :lg="8">
      <div class="login_page">
        <h3>欢迎登录 - MMALL管理系统</h3>
        <el-input class="inp" placeholder="请输入账号" v-model="username" clearable></el-input>
        <el-input class="inp" type="password" placeholder="请输入密码" v-model="password" clearable></el-input>
        <el-button style="width:100%" type="primary" @click="login">登录</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
import business from "../../network/index";
export default {
  data() {
    return {
      username: "admin",
      password: "admin",
      keep: {
        token: false
      }
    };
  },
  mounted() {
    window.localStorage.setItem("keepToken", JSON.stringify(this.keep));
  },
  methods: {
    login() {
      if (this.username && this.password) {
        business
          .login({
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.status === 1) {
              this.$message(res.data.msg);
            } else {
              this.$message(res.data.msg);
              this.$router.push("/");
              this.keep.token = true;
              window.localStorage.setItem(
                "keepToken",
                JSON.stringify(this.keep)
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message("请输入账号或密码");
      }
    }
  }
};
</script>

<style scoped>
.col {
  width: 100%;
  height: 85vh;
  display: inline-flex;
  padding-top: 15vh;
  justify-content: center;
}
.login_page {
  width: 94%;
  height: 200px;
  background-color: white;
  padding: 3%;
  text-align: center;
}
.inp {
  margin: 10px 0px;
}
</style>