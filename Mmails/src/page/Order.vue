<template>
  <MainContainerVue>
    <span slot="name">订单管理</span>
    <div slot="container">
      <div class="block">
        <el-table :data="orderList" stripe size="small" border>
          <el-table-column prop="orderNo" label="订单号"></el-table-column>
          <el-table-column prop="receiverName" label="收件人"></el-table-column>
          <el-table-column prop="statusDesc" label="订单状态"></el-table-column>
          <el-table-column prop="payment" label="订单总价"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <router-link class="toDetails" to="/order/details/110">查看</router-link>
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
          :total="228"
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
      orderList: [],
    };
  },
  methods: {
    getorderList() {
      business
        .orderList({
          pageNum: this.currentPage,
          pageSize: this.currentSize
        })
        .then(res => {
          if (res.data.status === 0) {
            this.orderList = res.data.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.getorderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderList();
    }
  },
  mounted() {
    this.getorderList();
  }
};
</script>

<style scoped>
.toDetails {
  color: skyblue;
}
.toDetails:hover {
  color: #2db7f5;
}
</style>