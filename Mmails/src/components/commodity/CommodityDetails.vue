<template>
  <MainContainerVue>
    <span slot="name">商品详情</span>
    <div slot="container">
      <table class="table_big">
        <tr>
          <td>商品名称</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="left">{{item.name}}</div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品描述</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="left">{{item.subtitle}}</div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>当前状态</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <div class="left">{{item.status==1?'在售':'已下架'}}</div>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>所属分类</td>
          <td>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="(item, index) in classList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>商品价格</td>
          <td>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
              <el-input disabled placeholder="请输入内容" v-model="item.price">
                <template slot="append">元</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品库存</td>
          <td>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
              <el-input disabled placeholder="请输入内容" v-model="item.stock">
                <template slot="append">件</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品图片</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <img class="details_img" :src="item.imageHost+item.mainImage" alt />
              <img class="details_img" :src="item.imageHost+item.subImages" alt />
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品详情</td>
          <td>
            <div class="details_div" v-html="item.detail"></div>
          </td>
        </tr>
      </table>
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
      id: this.$route.params.id,
      item: {},
      value: "",
      classList: []
    };
  },
  methods: {
    getDetails() {
      business
        .productDetails({
          productId: this.id
        })
        .then(res => {
          this.item = res.data.data;
          console.log(this.item)
          this.getClassList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClassList() {
      business
        .categoryList({
          categoryId: 0
        })
        .then(res => {
          this.classList = res.data.data;
          this.classList.forEach(element => {
            if (this.item.parentCategoryId === element.id) {
              this.value = element.name;
            }
          });
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
.left {
  padding-left: 10px;
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
}
.details_img {
  width: 80px;
  height: 80px;
}
.details_div :first-child {
  width: 80px;
  height: 80px;
}
</style>