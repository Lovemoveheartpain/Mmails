<template>
  <MainContainerVue>
    <span slot="name" >品类管理</span>
    <el-button slot="btn" type="primary" icon="el-icon-plus" size="mini">添加品类</el-button>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from '../components/Common/MainContainer.vue';

export default {
    components: {
        MainContainerVue
    }
};
</script>

<style scoped>
</style>