import Vuex from "vuex";
import Vue from "vue";
import product from "./modules/product";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

export const store = new Vuex.Store ({
    state: {
        purchase: 0.0,
        sale: 0.0,
        balance: 0.0
    },
    mutations,
    actions,
    getters,
    modules: {
        product
    }
});
