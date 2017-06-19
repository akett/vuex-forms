import VuexTextMixin from "../mixins/vuex-text"
import VuexTextTemplate from "../templates/vuex-text.html"
export default {
    name: 'VuexText',
    template: VuexTextTemplate,
    mixins: [VuexTextMixin()]
}