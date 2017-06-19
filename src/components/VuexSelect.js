import VuexSelectMixin from "../mixins/vuex-select"
import VuexSelectTemplate from "../templates/vuex-select.html"
export default {
    name: 'VuexSelect',
    template: VuexSelectTemplate,
    mixins: [VuexSelectMixin()]
}