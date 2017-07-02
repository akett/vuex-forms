import merge from "merge"
import VuexField from "./vuex-field"
import Masker from "../helpers/Masker"

export default () => merge.recursive(true, VuexField, {
    props: {
        type: {
            type: String,
            default: 'text',
            validator: value => {
                return ['text', 'textarea', 'tel', 'number', 'email', 'password', 'url', 'date'].indexOf(value) !== -1
            }
        },
        mask: {type: [Boolean, String], default: false},
        saveMask: {type: [Boolean, String], default: false},
    },
    beforeMount() {
        this.masker = new Masker()
    },
    methods: {

        hasMask() {
            return this.mask !== false && ['number', 'password'].indexOf(this.type.toLowerCase()) === -1
        },

        applyMask(value) {
            // if not deleting, apply the mask
            if (this.activeKeyCode !== 8 && this.activeKeyCode !== 46) {
                value = this.masker.applyMask(value, this.mask)
            }

            // set the input value to override tempValue
            this.$refs.input.value = value

            // set the caret position to prevent it from being pushed to the end of the input
            this.masker.updateCaretPosition(this.$refs.input, this.activeKeyCode)

            return value
        },

        applySaveMask(value) {
            if (this.saveMask === false) {
                value = this.masker.removeMask(value, this.mask)
            } else if (this.saveMask !== true) {
                value = this.masker.applyMask(value, this.saveMask)
            }
            return value;
        },

        handleKeyDown(e) {
            if (this.hasMask()) {
                this.activeKeyCode = e.keyCode || e.charCode
                // track the caret position in order to manually control it when applying a mask
                this.masker.readCaretPosition(this.$refs.input)
            }
        },

        inputEvent(event) {
            let value = event.target.value;
            if (this.hasMask()) {
                // apply the mask to the field
                value = this.applyMask(value)

                // apply the save mask for the final value
                event.target.value = this.applySaveMask(value)
            }

            this.value = value
            this.emitEvent('input', event)
        },

        blurEvent(event) {
            if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value)
            this.emitEvent('blur', event)
        },

        focusEvent(event) {
            if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value)
            this.emitEvent('focus', event)
        },
    }
})