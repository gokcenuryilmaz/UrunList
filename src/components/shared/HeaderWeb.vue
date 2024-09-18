<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
        <router-link
            to="/"
            tag="a"
            class="navbar-brand"
            style="color: azure;">
            Ürün Listesi
        </router-link>
        <ul class="navbar-nav mr-auto" >
            <router-link
                active-class="active"
                to="/urun-islemleri"
                tag="li"
                class="nav-item m-2"
                style="color: azure; cursor: pointer;">
                Ürün İşlemleri
            </router-link>
            <router-link
                active-class="active"
                to="/urun-cikisi"
                tag="li"
                class="nav-item m-2"
                style="color: azure; cursor: pointer;">
                Ürün Çıkışı
            </router-link>
        </ul>
    </nav>
</template>
<script>

</script>
<style>

</style>