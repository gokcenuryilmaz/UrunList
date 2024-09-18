<template>
  <div>
    <app-header></app-header> <!-- Bileşeni burada kullanıyorsunuz -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import HeaderWeb from './components/shared/HeaderWeb.vue';
import FooterWeb from './components/shared/FooterWeb.vue';

export default {
  components: {
    'app-header': HeaderWeb, // 'app-header' adında kaydedildi
    'app-footer': FooterWeb, // 'app-footer' adında kaydedildi
  },
  //frabase e kaydedildi
  created(){
    this.$store.dispatch("getTradeResult");
    this.$store.dispatch("initApp"); // tetiklemek için
  }
};
</script>
<style>
  body{
    background-color: #a7a0bb5c;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity .3s ease-out;
  }
  .fade-leave-active{
    transition: opacity.3s ease-out;
    opacity: 0;
  }
</style>