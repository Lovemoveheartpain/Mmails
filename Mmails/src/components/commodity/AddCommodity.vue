<template>
  <MainContainerVue>
    <span slot="name">商品管理 -- 添加商品</span>
    <div slot="container">
      <table class="table_big">
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
            <el-select v-model="firstName" @change="selected_one">
              <el-option label="请选择一级品类" value="0"></el-option>
              <el-option
                v-for="(item, index) in classList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="secondName" @change="selected_two" v-show="isShow">
              <el-option label="请选择二级品类" value="0"></el-option>
              <el-option
                v-for="(item, index) in secondList"
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-upload
                name="upload_file"
                action="/ask/product/upload.do"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="success"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
          </td>
        </tr>
        <tr>
          <td valign="top">商品详情</td>
          <td>
            <quill-editor
              ref="myQuillEditor"
              v-model="fromItem.detail"
              :options="editorOption"
              @ready="onEditorReady($event)"
              @change="onEditorChange($event)"
            />
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
import { config } from "../../network/networkConfig.js";
import quillConfig from "../../Util/quill-config.js";

export default {
  components: {
    MainContainerVue
  },
  data() {
    return {
      fromItem: {
        name: "",
        subtitle: "",
        categoryId: "0",
        detail: "",
        price: "",
        stock: "",
        status: 1,
        subImages: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      isShow: false,
      classList: [],
      secondList: [],
      secondName: "请选择二级品类",
      firstName: "请选择一级品类",
      editorOption: quillConfig,
      address: ""
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    success(val) {
      console.log(val);
      this.fromItem.subImages = val.data.uri;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    selected_one(val) {
      this.fromItem.categoryId = val;
      this.secondName = "请选择二级品类";
      this.getClassList(val);
    },
    selected_two(val) {
      if (val != 0) {
        this.fromItem.categoryId = val;
      }
    },

    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      this.fromItem.detail = html;
    },
    getClassList(val) {
      business
        .categoryList({
          categoryId: val
        })
        .then(res => {
          // console.log(res.data);
          if (val == 0) {
            this.classList = res.data.data;
          } else {
            this.secondList = res.data.data;
            if (this.secondList.length > 0) {
              this.isShow = true;
            } else {
              this.isShow = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCommodity() {
      console.log(this.fromItem.detail);
      if (!this.fromItem.name) {
        alert("请输入商品名称");
        return;
      }
      if (!this.fromItem.subtitle) {
        alert("请输入商品描述");
        return;
      }
      if (!this.fromItem.price) {
        alert("请输入商品价格");
        return;
      }
      if (!this.fromItem.stock) {
        alert("请输入库存");
        return;
      }
      business
        .productSave(this.fromItem)
        .then(res => {
          if (res.data.status == 0) {
            alert(res.data.data);
            this.$router.push("/commodity");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.address = config.path.productImage;
    this.editor.container.style.height = "300px";
    this.getClassList(0);
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