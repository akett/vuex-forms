import Form from "./Form"
import Errors from "./Errors"

export {
    Form,
    Errors
}

import VuexInput from './components/VuexInput.vue';
import VuexText from './components/VuexText.vue';

const VuexForms = {
    install(Vue, options) {
        Vue.component(VuexInput.name, VuexInput)
        Vue.component(VuexText.name, VuexText)
    }
};

export default VuexForms;
