import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        initNumber: '1',
    },
    mutations: {
        setInitNumber(state, value) {
            switch (value) {
                case "/":
                    state.initNumber = "1";
                    break;
                case "/commodity":
                    state.initNumber = "2-1";
                    break;
                case "/category":
                    state.initNumber = "2-2";
                    break;
                case "/order":
                    state.initNumber = "3-1";
                    break;
                case "/user":
                    state.initNumber = "4-1";
                default:
                    break;
            }
        }
    },
    actions: {

    },
    modules: {

    }
})
