import VuexRadioMixin from "../mixins/vuex-radio"
import VuexRadioTemplate from "../templates/vuex-radio.html"
export default {
    name: 'VuexRadio',
    template: VuexRadioTemplate,
    mixins: [VuexRadioMixin()]
}