<template>
  <MainContainerVue>
    <span slot="name">订单管理</span>
    <div slot="container">
      <el-form :inline="true" :model="formInline">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="按订单号查询">
            <el-option label="按订单号查询" value="按订单号查询"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.orderId" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="block">
        <el-table :data="orderList" stripe size="small" border>
          <el-table-column prop="orderNo" label="订单号"></el-table-column>
          <el-table-column prop="receiverName" label="收件人"></el-table-column>
          <el-table-column prop="statusDesc" label="订单状态"></el-table-column>
          <el-table-column prop="payment" label="订单总价"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column align="center" label="操作">
            <router-link
              class="toDetails"
              slot-scope="scope"
              :to="{path:'/order/details/'+scope.row.orderNo,}"
            >查看</router-link>
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
      orderList: [],
      title: ["订单号", "收件人", "订单状态", "订单总价", "创建时间", "操作"],
      total: 0,
      formInline: {
        orderId: "",
        region: "按订单号查询"
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.formInline.orderId) {
        alert("请输入订单号");
        return;
      }
      business
        .orderIdSearch({
          orderNo: this.formInline.orderId
        })
        .then(res => {
          if (res.data.status == "1") {
            alert(res.data.msg);
          } else if (res.data.status == "0") {
            this.orderList = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          alert("哪里不对了");
          console.log(err);
        });
    },
    getorderList() {
      business
        .orderList({
          pageNum: this.currentPage,
          pageSize: this.currentSize
        })
        .then(res => {
          if (res.data.status === 0) {
            this.orderList = res.data.data.list;
            this.total = res.data.data.total;
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