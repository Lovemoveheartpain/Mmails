<template>
  <MainContainerVue>
    <span slot="name">商品管理 -- 添加商品</span>
    <div slot="container">
      <table class="table_big" border>
        <tr>
          <td>商品名称</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="fromItem.name" placeholder="请输入内容"></el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品描述</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-input v-model="fromItem.subtitle" placeholder="请输入内容"></el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>所属分类</td>
          <td>
            <el-select v-model="fromItem.categoryId" placeholder="请选择">
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
              <el-input type="number" placeholder="请输入内容" v-model="fromItem.price">
                <template slot="append">元</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品库存</td>
          <td>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
              <el-input type="number" placeholder="请输入内容" v-model="fromItem.stock">
                <template slot="append">件</template>
              </el-input>
            </el-col>
          </td>
        </tr>
        <tr>
          <td>商品图片</td>
          <td>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <input type="file" name="upload_file" />
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
              v-model="fromItem.detail"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <el-button size="small" type="primary" @click="addCommodity">提交</el-button>
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
      fromItem: {
        name: "",
        subtitle: "",
        categoryId: "",
        detail: "",
        price: "",
        stock: "",
        status: 1
      },
      classList: [],
      fileList: []
    };
  },
  methods: {
    getClassList() {
      business
        .categoryList({
          categoryId: 0
        })
        .then(res => {
        //   console.log(res.data.data);
          this.classList = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCommodity() {
    //   console.log(this.fromItem);
      business
        .productSave(this.fromItem)
        .then(res => {
          if(res.data.status==0){
              alert(res.data.data);
              this.$router.push('/category')
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.getClassList();
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
</style>