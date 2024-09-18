import Vue from "vue";
import VueRouter from "vue-router";
import ProductList from "./components/products/ProductList.vue";
import ProductSell from "./components/products/ProductSell";
import ProductPurchase from "./components/products/ProductPurchase";

Vue.use(VueRouter);
const routes = [
    { path: "/", component: ProductList }, 
    { path: "/urun-islemleri", component: ProductPurchase },
    { path: "/urun-cikisi", component: ProductSell },
    { path: "*", redirect: "/" }
];
export const router = new VueRouter({
    mode : "history",
    routes
})
//bağmsız bir js dosyası o yüzden vue.js nerde bilemez import etmem lazım.