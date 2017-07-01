import Form from "./Form"
import Errors from "./Errors"

import VuexText from './components/VuexText';
import VuexCheckbox from './components/VuexCheckbox';
import VuexRadio from './components/VuexRadio';
import VuexSelect from './components/VuexSelect';
import InputSyncDirective from './InputSyncDirective';

const VuexForms = {
    install(Vue, options) {
        Vue.component('vuex-text', VuexText)
        Vue.component('vuex-checkbox', VuexCheckbox)
        Vue.component('vuex-radio', VuexRadio)
        Vue.component('vuex-select', VuexSelect)
        Vue.directive('input-sync', InputSyncDirective)
    }
};

export {
    VuexForms,
    Form,
    Errors
}

export default VuexForms;