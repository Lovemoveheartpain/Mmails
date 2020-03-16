<template>
  <MainContainerVue>
    <span slot="name">品类管理</span>
    <el-button slot="btn" type="primary" icon="el-icon-plus" size="mini" @click="toAdd">添加品类</el-button>
    <div slot="container">
      <div>当前商品分类ID:{{categoryId}}</div>
      <el-table :data="categoryList" stripe border>
        <el-table-column prop="id" label="品类ID"></el-table-column>
        <el-table-column prop="name" label="品类名称"></el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope">
            <span class="category_btn" @click="change(scope.row)">修改名称</span>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from "../Common/MainContainer.vue";
import business from "../../network/index";

export default {
  components: {
    MainContainerVue
  },
  data() {
    return {
      categoryId: this.$route.params.id,
      categoryList: []
    };
  },
  methods: {
    toAdd() {
      this.$router.push("/category/add");
    },
    change(item) {
      let name = window.prompt("请输入新的品类名称", item.name);
      if (name !== null) {
        this.changeSure(item.id, name);
      }
    },
    changeSure(id, name) {
      business
        .changeCategory({
          categoryId: id,
          categoryName: name
        })
        .then(res => {
          if (res.data.status === 0) {
            alert(res.data.data);
            this.getcategoryList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getcategoryList() {
      business
        .categoryList({
          categoryId: this.categoryId
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 0) {
            this.categoryList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getcategoryList();
  }
};
</script>

<style scoped>
.category_btn {
  color: #2db7f5;
  cursor: pointer;
}
.category_btn:hover {
  color: gray;
}
</style>