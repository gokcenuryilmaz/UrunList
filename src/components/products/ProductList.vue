<template>
    <div class="container">
      <div class="row">
        <div class="col-12 mb-5 card mt-5 shadow">
          <div class="card-body">
            <h3>Ürün Listesi</h3>
            <hr>
            <!-- Ürünler varsa tablo göster -->
            <table v-if="getProducts.length > 0" class="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Ürün Adı</th>
                  <th>Adet</th>
                  <th>Fiyat</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in getProducts" :key="product.id">
                  <td class="align-middle text-center"><span class="badge badge-info">{{ product.key }}</span></td>
                  <td class="align-middle text-center">{{ product.title }}</td>
                  <td class="align-middle text-center" :class="getCountClasses(product.count)">{{ product.count }}</td> <!--renk değişimi dinamik olamsı gerektiği için yani 0 dan büyükse yeşil küçükse kırmızı class'ı bind etmeliyim-->
                  <td style="width: 120px;">{{ product.price | currency }}</td>
                  <td class="align-middle">{{ product.description }}</td>
                </tr>
              </tbody>
            </table>
  
            <!-- Ürün yoksa uyarı mesajı göster -->
            <div class="alert alert-warning" v-else>
              <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
              <br>
              <small>Kayıt Eklemek için Ürün İşlemleri menüsünden yararlanabilirsiniz</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  //getter'ın içinde getProducts
  import { mapGetters } from 'vuex';
  export default {
   computed : {
    ...mapGetters(["getProducts"]),
   },
   //computed'a parametre gönderilmediği için metotta yapıyoruz 
   methods : {
    // adete göre arka plan renklendirmesi
    getCountClasses(count){
      return {
        'btn-danger text-white' : count == 0 || count == null,
        'btn-success text-white' :  count > 0,
      }
    }
   }
  }
  </script>
  