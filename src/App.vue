<template>
    <div id="app">
        <img src="./assets/logo.png">
        <h1>Vuex Forms</h1>
        <form-example></form-example>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    @import "./sass/main.scss";
</style>
