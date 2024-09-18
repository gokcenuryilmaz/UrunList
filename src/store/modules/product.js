import Vue from "vue";
import {router} from "../../router"
const state = {
    products : [] //verileri firebaseden çekeceğiz

}
const getters = {
    getProducts (state) {
        return state.products;
    },//tüm ürünleri döndürsün
    getProduct: (state) => (key) => {
        return state.products.filter(element => {
            return element.key == key;
        });
    }
}

// mutationsun görevi productsımı(state'i güncellemek) güncellemek
const mutations = {
    updateProductList(state, product) {
        state.products.push(product);
    },
    sellProduct(state, payload) {
        let product = state.products.find(element => element.key == payload.key);
        if (product) {
            product.count -= payload.count;
        }
    }
}
//
const actions = {
    //diş dünyadan veri alma(firebase)
    initApp({commit}){
        Vue.http.get("https://urun-list-default-rtdb.firebaseio.com/products.json")
        .then(response => {
           let data = response.body;
           for(let key in data){
                data[key].key =key;
                commit("updateProductList", data[key]);
           }
        })
    },
   
    saveProduct({ dispatch, commit }, product) {
        // Firebase'e post işlemi
        Vue.http.post("https://urun-list-default-rtdb.firebaseio.com/products.json", product)
            .then((response) => {
                // Üürün listesinin güncellenmesi
                product.key = response.body.name;
                // Mutasyonu tetikleyelim
                commit('updateProductList', product); // Ürünü store'a ekle
                let tradeResult = {
                    purchase :product.price,
                    sale : 0,
                    count : product.count 
                }
                dispatch('setTradeResult',tradeResult);
                router.replace("/");// kaydetme işleminden sonra anasayfaya dön
            })
            .catch((error) => {
                console.error(error);
            });
    },    
    sellProduct({ commit, state, dispatch }, payload) {
        let product = state.products.find(element => element.key == payload.key);
        if (product) {
            let totalCount = product.count - payload.count;
            Vue.http.patch("https://urun-list-default-rtdb.firebaseio.com/products/" + payload.key + ".json", { count: totalCount })
                .then(response => {
                    console.log(response);
                    commit('sellProduct', { key: payload.key, count: payload.count });
                    let tradeResult = {
                        purchase :0,
                        sale : product.price,
                        count : payload.count 
                    }
                    dispatch('setTradeResult',tradeResult);
                    router.replace("/");// kaydetme işleminden sonra anasayfaya dön
                });
        }
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}