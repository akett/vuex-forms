// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import VuexForms from "../lib"

Vue.use(VuexForms)

import ValidationOptions from "./components/ValidationOptions.vue";
import FormExample from "./components/FormExample.vue";
import FormExample2 from "./components/FormExample2.vue";
Vue.component('validation-options', ValidationOptions)
Vue.component('form-example', FormExample)
Vue.component('form-example2', FormExample2)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
