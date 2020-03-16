<template>
  <MainContainerVue>
    <span slot="name">订单详情</span>
    <div slot="container">
      <div class="order_table">
        <table class="table_big">
          <tr>
            <td>订单号：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>{{list.orderNo}}</div>
              </el-col>
            </td>
          </tr>
          <tr>
            <td>创建时间：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>{{list.createTime}}</div>
              </el-col>
            </td>
          </tr>
          <tr>
            <td>收件人：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>{{list.receiverName}}</div>
              </el-col>
            </td>
          </tr>
          <tr>
            <td>订单状态：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>{{list.statusDesc}}</div>
              </el-col>
            </td>
          </tr>
          <tr>
            <td>支付方式：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>{{list.paymentTypeDesc}}</div>
              </el-col>
            </td>
          </tr>
          <tr>
            <td>订单金额：</td>
            <td>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div>￥{{list.payment}}</div>
              </el-col>
            </td>
          </tr>
        </table>
      </div>
      <div class="order_bottom">
        <table class="table_bottom" border="1px" cellspacing="0">
          <tr>
            <td>商品图片</td>
            <td>商品信息</td>
            <td>单价</td>
            <td>数量</td>
            <td>合计</td>
          </tr>
          <tr v-for="(item, index) in list.orderItemVoList" :key="index">
            <td>
              <img class="order_img" :src="list.imageHost+item.productImage" alt />
            </td>
            <td>{{item.productName}}</td>
            <td>￥{{item.currentUnitPrice}}</td>
            <td>{{item.quantity}}</td>
            <td>￥{{item.totalPrice}}</td>
          </tr>
        </table>
      </div>
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
      id: this.$route.params.id,
      list: {}
    };
  },
  methods: {
    getDetails() {
      business
        .orderDetails({
          orderNo: this.id
        })
        .then(res => {
          console.log(res.data);
          this.list = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDetails();
  }
};
</script>

<style scoped>
.order_table {
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
.el-col > div {
  width: 95%;
  background: white;
  line-height: 35px;
  padding-left: 10px;
}
.order_bottom {
  width: 100%;
}
.table_bottom {
  width: 100%;
}
.order_img {
  width: 80px;
  height: 80px;
}
.table_bottom > tr > td {
  vertical-align: top;
}
</style>