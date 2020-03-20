import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        initNumber: '1',
        commodityNumber: 1,
        orderNumber: 1,
        userNumber: 1
    },
    mutations: {
        setInitNumber(state, value) {
            if (value.indexOf("/commodity") != -1) {
                state.initNumber = "2-1";
            } else if (value.indexOf("/category") != -1) {
                state.initNumber = "2-2";
            } else if (value.indexOf("/order") != -1) {
                state.initNumber = "3-1";
            } else if (value.indexOf("/user") != -1) {
                state.initNumber = "4-1";
            } else if (value.indexOf("/echarts") != -1) {
                state.initNumber = "5-1";
            } else if (value.indexOf("/map") != -1) {
                state.initNumber = "5-2";
            } else if (value.indexOf("/international") != -1) {
                state.initNumber = "5-3";
            } else {
                state.initNumber = "1";
            }
        },
        setCommodityNumber(state, value) {
            state.commodityNumber = value
        },
        setOrderNumber(state, value) {
            state.orderNumber = value
        },
        setUserNumber(state, value) {
            state.userNumber = value
        }
    },
    actions: {

    },
    modules: {

    }
})
