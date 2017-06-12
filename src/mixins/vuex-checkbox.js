import merge from "merge"
import VuexField from "./vuex-field"

export default () => merge.recursive(true, VuexField, {
    props: {
        trueValue: {type: [Number, Boolean, String], default: true},
        falseValue: {type: [Number, Boolean, String], default: false},
    },
    methods: {
        handleCheckbox(event) {
            let newEvent          = this.createEvent(event, 'input');
            newEvent.target.value = event.target.checked ? this.trueValue : this.falseValue
            this.inputEvent(newEvent)
        },
    }
})