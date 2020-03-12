<template>
  <MainContainerVue>
    <span slot="name">品类管理</span>
    <el-button slot="btn" type="primary" icon="el-icon-plus" size="mini" @click="toAdd" >添加品类</el-button>
    <div slot="container">
      <div>当前商品分类ID:0</div>
      <el-table :data="categoryList" stripe border>
        <el-table-column prop="id" label="品类ID"></el-table-column>
        <el-table-column prop="name" label="品类名称"></el-table-column>
        <el-table-column label="操作">
          <span class="category_btn" >修改名称</span>
          <span class="category_btn" >查看其子品类</span>
        </el-table-column>
      </el-table>
    </div>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from "../components/Common/MainContainer.vue";
import business from "../network/index.js";

export default {
  components: {
    MainContainerVue
  },
  data() {
    return {
      categoryId:0,
      categoryList:[]
    }
  },
  methods: {
    toAdd(){
      this.$router.push('/category/add')
    },
    getcategoryList() {
      business
        .categoryList({
          categoryId:this.categoryId
        })
        .then(res => {
          console.log(res.data.data)
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