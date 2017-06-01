import Form from "./Form"
import Errors from "./Errors"

export {
    Form,
    Errors
}

import VuexInput from './components/VuexInput.vue';

const VuexForms = {
    install(Vue, options) {
        Vue.component(VuexInput.name, VuexInput)
    }
};

export default VuexForms;
