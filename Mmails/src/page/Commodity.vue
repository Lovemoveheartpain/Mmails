<template>
  <MainContainerVue>
    <span slot="name">商品管理</span>
    <el-button slot="btn" type="primary" icon="el-icon-plus" size="mini" @click="toAdd">添加商品</el-button>
    <div slot="container">
      <el-form :inline="true" :model="formInline">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="按商品id查询">
            <el-option label="按商品id查询" value></el-option>
            <el-option label="按商品名称查询" value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.orderId" placeholder="关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="block">
        <el-table :data="commodityList" stripe size="small" border>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="信息"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="payment" label="状态"></el-table-column>
          <el-table-column align="center" label="操作">
            <router-link class="conmodity_btn" to="/commodity/details/110">查看</router-link>
            <router-link class="conmodity_btn" to="/commodity/change">编辑</router-link>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
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
      currentPage: 1,
      currentSize: 10,
      commodityList: [],
      total: 0,
      formInline: {
        orderId: "",
        region: "按商品id查询"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    toAdd() {
      this.$router.push("/commodity/add");
    },
    toChange() {
      this.$router.push("/commodity/change");
    },
    toDetails() {
      this.$router.push("/commodity/details/");
    },
    getCommodityList() {
      business
        .productList({
          pageNum: this.currentPage,
          pageSize: this.currentSize
        })
        .then(res => {
          if (res.data.status === 0) {
            this.commodityList = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.getCommodityList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCommodityList();
    }
  },
  mounted() {
    this.getCommodityList();
  }
};
</script>
<style scoped>
.conmodity_btn {
  color: skyblue;
}
.conmodity_btn:hover {
  color: #2db7f5;
}
</style>