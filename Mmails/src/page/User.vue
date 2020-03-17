<template>
  <MainContainerVue>
    <span slot="name">用户列表</span>
    <div slot="container">
      <div class="block">
        <el-table :data="userList" stripe size="small" border>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="createTime" label="注册时间">
            <span slot-scope="scope">{{scope.row.createTime | transitionTime}}</span>
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
      userList: [],
      total: 0
    };
  },
  filters: {
    transitionTime(val) {
      let newDate = new Date();
      newDate.setTime(val);
      return newDate.toLocaleString();
    }
  },
  methods: {
    getuserList() {
      business
        .userList({
          pageNum: this.currentPage,
          pageSize: this.currentSize
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 0) {
            // let newDate = new Date();
            // res.data.data.list.forEach(element => {
            //   newDate.setTime(element.createTime);
            //   element.createTime = newDate.toLocaleString();
            // });
            this.userList = res.data.data.list;
            this.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.currentSize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserList();
    }
  },
  mounted() {
    this.getuserList();
  }
};
</script>

<style scoped>
</style>