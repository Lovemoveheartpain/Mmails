<template>
<MainContainerVue>
    <span slot="name">Echarts</span>
    <div slot="container" >
         <el-button type="primary" @click="click">去看看</el-button>
    </div>
</MainContainerVue>
</template>

<script>
import MainContainerVue from '../components/Common/MainContainer.vue'

    export default {
        components: {
            MainContainerVue
        },
        methods: {
            click(){
                this.$router.push('/echarts_Details')
            }
        },
    }
</script>

<style scoped>

</style>