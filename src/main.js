// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import VuexInput from "./components/VuexInput.vue";
Vue.component('vuex-input', VuexInput)

import VuexForm from "./components/VuexForm.vue";
Vue.component('vuex-form', VuexForm)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
