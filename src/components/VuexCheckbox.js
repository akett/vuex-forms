import VuexCheckboxMixin from "../mixins/vuex-checkbox"
import VuexCheckboxTemplate from "../templates/vuex-checkbox.html"
export default {
    name: 'VuexCheckbox',
    template: VuexCheckboxTemplate,
    mixins: [VuexCheckboxMixin()]
}