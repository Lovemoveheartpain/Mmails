<template>
  <MainContainerVue>
    <span slot="name">品类管理 -- 添加品类</span>
    <div slot="container">
      <div class="order_table">
        <table class="table_big">
          <tr>
            <td>所属品类</td>
            <td>
              <el-select v-model="value" placeholder="请输入">
                <el-option label="/所有" value="0"></el-option>
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="'/所有/'+item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>品类名称</td>
            <td>
              <el-col :xs="24" :sm="24" :md="9" :lg="9">
                <el-input v-model="input" placeholder="请输入品类名称"></el-input>
              </el-col>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <el-button type="primary" @click="submit">提交</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from "../Common/MainContainer.vue";
import business from "../../network";

export default {
  components: {
    MainContainerVue
  },
  data() {
    return {
      options: [],
      value: "",
      input: ""
    };
  },

  methods: {
    submit() {
      if (!this.value) {
        alert("请输入所属品类");
        return;
      }
      if (!this.input) {
        alert("请输入所属名称");
        return;
      }
      business
        .addCategory({
          parentId: this.value,
          categoryName: this.input
        })
        .then(res => {
          if (res.data.status === 0) {
            alert(res.data.data);
            this.$router.push("/category");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClass() {
      business
        .categoryList({
          categoryId: 0
        })
        .then(res => {
          this.options = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClass();
  }
};
</script>

<style scoped>
.category_table {
  width: 100%;
}
.table_big {
  width: 100%;
}
.table_big > tr {
  height: 50px;
}
.table_big > tr > td:first-child {
  text-align: right;
  font-weight: 600;
  width: 150px;
}
.table_big > tr > td:nth-child(2) {
  padding-left: 30px;
}
</style>