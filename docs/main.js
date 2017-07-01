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
Vue.config.debug         = true
Vue.config.devtools      = true

import ApiReporter from "./components/ApiReporter.vue";
import AppHeader from "./components/layout/AppHeader.vue";
import DocExample from "./components/layout/DocExample.vue";
import ValidationOptions from "./components/ValidationOptions.vue";

import Introduction from "./components/sections/Introduction.vue";
import Installation from "./components/sections/Installation.vue";
import Setup from "./components/sections/Setup.vue";
import Webpack from "./components/sections/Webpack.vue";
import BasicUsage from "./components/sections/BasicUsage.vue";

import BasicForm from "./components/examples/BasicForm.vue";
import BasicValidation from "./components/examples/BasicValidation.vue";
import DynamicValidation from "./components/examples/DynamicValidation.vue";
import CompleteForm from "./components/examples/CompleteForm.vue";
import NestedExample from "./components/examples/NestedExample.vue";

Vue.component('api-reporter', ApiReporter)
Vue.component('app-header', AppHeader)
Vue.component('doc-example', DocExample)
Vue.component('validation-options', ValidationOptions)

Vue.component('introduction', Introduction)
Vue.component('installation', Installation)
Vue.component('setup', Setup)
Vue.component('webpack', Webpack)
Vue.component('basic-usage', BasicUsage)

Vue.component('basic-form', BasicForm)
Vue.component('basic-validation', BasicValidation)
Vue.component('complete-form', CompleteForm)
Vue.component('dynamic-validation', DynamicValidation)
Vue.component('nested-example', NestedExample)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App}
})
