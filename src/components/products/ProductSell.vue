<template>
    <div class="container">
        <div class="row">
            <div class="col-6 offset-3 pt-3 card mt-5 shadow">
                <div class="card-body">
                    <h3>Ürün Çıkışı</h3>
                    <hr>
                    <div class="form-group">
                        <label>Ürün Adı</label>
                        <select class="form-control" v-model="selectedProduct" @change="productSelected">
                            <option selected disabled>Lütfen bir ürün seçiniz...</option>
                            <option 
                                :disabled="product.count == 0"
                                :key="product.key"
                                v-for="product in getProducts"
                                :value ="product.key">
                                {{ product.title }}
                            </option>
                        </select>
                    </div>
                    <transition name="fade" mode="out-in"> 
                        <div class="card mb-2 border border-danger" v-if="product !== null">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <div class="mb-3">
                                            <span class="badge badge-info">Stok : {{product.count}}</span>
                                            <span class="badge badge-primary">Fiyat : {{ product.price | currency }}</span>
                                        </div>
                                        <p class="border border-warning p-2 text-secondary">{{product.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                   
                    <div class="form-group">
                        <label>Adet</label>
                        <input type="text" class="form-control" 
                               :class="{ 'border-danger': isQuantityInvalid }"
                               placeholder="Ürün adetini giriniz.." 
                               v-model="product_count"
                               @input="validateQuantity">
                        <div v-if="isQuantityInvalid" class="text-danger mt-2">
                            Stok miktarından fazla adet girilemez.
                        </div>
                    </div>
                    <hr>
                    <button @click="save" :disabled="saveEnabled" class="btn btn-primary">Kaydet</button>
                </div>
            </div>
        </div>
    </div>
</template><script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            selectedProduct: null,
            product: null,
            product_count: null,
            saveButtonClicked: false, // Kaydet butonu tıklanmamış olarak başlatılıyor
            isQuantityInvalid: false // Adet doğrulama için hata kontrolü
        }
    },
    computed: {
        ...mapGetters(['getProducts']),
        saveEnabled() {
            return !(this.selectedProduct !== null && this.product_count > 0 && !this.isQuantityInvalid);
        }
    },
    methods: {
        productSelected() {
            console.log(this.selectedProduct);
            this.product = this.$store.getters.getProduct(this.selectedProduct)[0];
        },
        save() {
            let product = {
                key: this.selectedProduct,
                count: this.product_count
            }
            this.$store.dispatch("sellProduct", product);
            this.saveButtonClicked = true; // Kaydet butonuna basıldığında tıklanmış olduğunu belirtiyoruz
        },
        validateQuantity() {
            if (this.product && this.product_count > this.product.count) {
                this.isQuantityInvalid = true;
            } else {
                this.isQuantityInvalid = false;
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if ((this.selectedProduct !== null || this.product_count > 0) && !this.saveButtonClicked) {
            if (confirm("Kaydedilmemiş değişiklikler var. Yine de çıkmak istiyor musunuz?")) {
                next(); // Geçişe izin ver
            } else {
                next(false); // Geçişi iptal et
            }
        } else {
            next(); // Geçişe izin ver
        }
    }
}
</script><style scoped>
    .border-danger {
        border: 1px solid red !important;
    }
    .text-danger {
        color: red;
    }
</style>