// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueHighlightJS from "vue-highlightjs"
import VuexForms from "../src"

Vue.use(VueHighlightJS)
Vue.use(VuexForms)

Vue.config.productionTip = false
Vue.config.debug = true
Vue.config.devtools = true

import ApiReporter from "./components/ApiReporter.vue";
import AppHeader from "./components/layout/AppHeader.vue";
import ValidationOptions from "./components/ValidationOptions.vue";
import BasicValidation from "./components/forms/BasicValidation.vue";
import DynamicValidation from "./components/forms/DynamicValidation.vue";

Vue.component('api-reporter', ApiReporter)
Vue.component('app-header', AppHeader)
Vue.component('validation-options', ValidationOptions)
Vue.component('basic-validation', BasicValidation)
Vue.component('dynamic-validation', DynamicValidation)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App}
})
