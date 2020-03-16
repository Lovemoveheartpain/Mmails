<template>
  <MainContainerVue>
    <span slot="name">商品管理 -- 修改商品</span>
    <div slot="container">
      <table class="table_big">
        <tr>
          <td>商品名称</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="item.name" placeholder="请输入内容"></el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品描述</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="item.subtitle" placeholder="请输入内容"></el-input>
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
              <el-input type="number" placeholder="请输入内容" v-model="item.price">
                <template slot="append">元</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品库存</td>
          <td>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
              <el-input type="number" placeholder="请输入内容" v-model="item.stock">
                <template slot="append">件</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品图片</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture-card"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品详情</td>
          <td>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="item.detail"
            ></el-input>
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
      classList: [],
      fileList: []
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
          console.log(this.item);
          let obj = {};
          obj.name = "test.jpg";
          obj.url = this.item.imageHost + this.item.mainImage;
          this.fileList.push(obj);
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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