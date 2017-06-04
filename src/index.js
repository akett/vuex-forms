import Form from "./Form"
import Errors from "./Errors"

import VuexInput from './components/VuexInput.vue';
import VuexText from './components/VuexText.vue';

const VuexForms = {
    install(Vue, options) {
        Vue.component('vuex-input', VuexInput)
        Vue.component('vuex-text', VuexText)
    }
};

export {
    VuexForms,
    Form,
    Errors
}

export default VuexForms;