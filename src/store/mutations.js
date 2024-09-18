export const updateTradeResult = (state,payload) => {
    if(payload.count){
        state.sale  += parseFloat(payload.sale) * parseInt(payload.count);
        state.purchase  += parseFloat(payload.purchase) * parseInt(payload.count);
    }
    else{
        state.sale  += parseFloat(payload.sale) ;
        state.purchase  += parseFloat(payload.purchase);
    }
    state.balance =  parseFloat(state.sale) - parseFloat(state.purchase);
}