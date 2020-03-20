<template>
  <MainContainerVue>
    <span slot="name">商品管理</span>
    <el-button slot="btn" type="primary" icon="el-icon-plus" size="mini" @click="toAdd">添加商品</el-button>
    <div slot="container">
      <el-form :inline="true" :model="formInline">
        <el-form-item>
          <el-select v-model="formInline.region">
            <el-option label="按商品id查询" value="1"></el-option>
            <el-option label="按商品名称查询" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.commodityId" placeholder="关键词"></el-input>
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
          <el-table-column prop="payment" label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.status=='1'?'在售':'已下架'}}</span>
              <span @click="changeStatus(scope.row)" class="btn">{{scope.row.status=='1'?'下架':'上架'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <router-link class="conmodity_btn" :to="{path:'/commodity/details/'+scope.row.id}">查看</router-link>
              <router-link class="conmodity_btn" :to="{path:'/commodity/change/'+scope.row.id}">编辑</router-link>
            </template>
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
      currentSize: 10,
      commodityList: [],
      total: 0,
      formInline: {
        commodityId: "",
        region: ""
      }
    };
  },
  computed: {
    currentPage() {
      return this.$store.state.commodityNumber;
    }
  },
  methods: {
    changeStatus(item) {
      console.log(item);
      business
        .productSoldOut({
          productId: item.id,
          status: item.status == "1" ? "2" : "1"
        })
        .then(res => {
          if (res.data.status == 0) {
            alert(res.data.data);
            this.getCommodityList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      if (!this.formInline.region) {
        alert("请选择查询条件");
        return;
      }
      if (!this.formInline.commodityId) {
        if (this.formInline.region === "1") {
          alert("请输入商品id");
        } else if (this.formInline.region === "2") {
          alert("请输入商品名称");
        }
        return;
      }
      if (this.formInline.region === "1") {
        business
          .productSearchId({
            productId: this.formInline.commodityId
          })
          .then(res => {
            if (res.data.status === 0) {
              this.commodityList = res.data.data.list;
              this.total = res.data.data.total;
            }
          })
          .catch(err => {
            alert("哪里不对了");
            console.log(err);
          });
      } else if (this.formInline.region === "2") {
        business
          .productSearchName({
            productName: this.formInline.commodityId,
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
      }
    },
    toAdd() {
      this.$router.push("/commodity/add");
    },
    toChange() {
      this.$router.push("/commodity/change");
    },
    getCommodityList() {
      business
        .productList({
          pageNum: this.currentPage,
          pageSize: this.currentSize
        })
        .then(res => {
          if (res.data.status === 0) {
            console.log(res.data.data.list);
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
      if (this.formInline.commodityId) {
        this.onSubmit();
      } else {
        this.getCommodityList();
      }
    },
    handleCurrentChange(val) {
      this.$store.commit("setCommodityNumber", val);
      if (this.formInline.commodityId) {
        this.onSubmit();
      } else {
        this.getCommodityList();
      }
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
.btn {
  background-color: #f0ad4e;
  padding: 2px 5px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #ec971f;
}
</style>