
import Vue from 'vue';
// firebase e bu sonucları yazmak için kullanıyorum
export const setTradeResult = ({state , commit} , tradeResult ) => {
    commit("updateTradeResult",tradeResult);
    let tradeData = {
        purchase : state.purchase,
        sale : state.sale
    }
    //post yerine put çünkü put kaydın yerine yazar post sürekli yeni kayıt ekler
    Vue.http.put("https://urun-list-default-rtdb.firebaseio.com/trade-result.json",tradeData)
        .then( response =>{
            console.log(response);
        })
}
export const getTradeResult = ({commit}) => {
    Vue.http.get ("https://urun-list-default-rtdb.firebaseio.com/trade-result.json")
    .then(response =>{
        console.log(response);
        commit("updateTradeResult", response.body);
    })
}
