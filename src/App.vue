<template>
    <div id="app">
        <img src="./assets/logo.png">
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
