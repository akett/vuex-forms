import merge from "merge"
import VuexField from "./vuex-field"
import Masker from "../../helpers/Masker"

export default () => merge.recursive(true, VuexField, {
    props: {
        type: {
            type: String,
            default: 'text',
            validator: value => {
                return ['text', 'textarea', 'tel', 'number', 'email', 'password', 'url'].indexOf(value) !== -1
            }
        },
        mask: {type: [Boolean, String], default: false},
        saveMask: {type: [Boolean, String], default: false},
    },
    mounted() {
        this.tempValue = this.tempValue || (this.value ? this.value.toString() : '')
    },
    methods: {
        hasMask() {
            return this.mask !== false && this.type !== 'number' && this.type !== 'password'
        },

        handleKeyDown(e) {
            this.activeKeyCode = e.keyCode || e.charCode
            if (!this.hasMask()) {
                if (this.activeKeyCode === 8 && this.activeKeyCode === 46) {
                    this.handleInput(e)
                }
                return;
            }
            this.getCaretPosition()
        },

        getCaretPosition() {
            if (!this.hasMask()) return

            Masker.readCaretPosition(this.$refs.input)
        },

        applySaveMask(value) {
            if (this.saveMask === true) {
                value = Masker.applyMask(Masker.removeMask(value, this.mask), this.mask)
            } else if (this.saveMask === false) {
                value = Masker.removeMask(value, this.mask)
            } else {
                value = Masker.applyMask(Masker.removeMask(value, this.mask), this.saveMask)
            }
            return value;
        },

        inputEvent(event) {
            let value = event.target.value;
            if (!this.hasMask()) {
                this.tempValue = value
                this.emitEvent('input', event)
                return;
            }

            // a mask was specified, if not deleting, apply the mask and update the input's value
            if (this.activeKeyCode !== 8 && this.activeKeyCode !== 46) {
                this.tempValue = value = Masker.applyMask(Masker.removeMask(value, this.mask), this.mask)
                Masker.updateCaretPosition(this.$refs.input, this.activeKeyCode)
            } else {
                this.tempValue = value
            }

            // apply the save mask
            event.target.value = this.applySaveMask(value)

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