import Masker from "../utils/Masker";

let VuexInput = {
    props: {
        id: {type: String, default: null},
        placeholder: {type: [String], default: ''},
        type: {type: String, default: 'text'},
        value: {type: [Number, Boolean, String], default: ''},
        trueValue: {type: [Number, Boolean, String], default: true},
        falseValue: {type: [Number, Boolean, String], default: false},
        mask: {type: [Boolean, String], default: false},
        saveMask: {type: [Boolean, String], default: false},
        options: {type: [String, Object, Array], default: () => []},
        option_name: {type: [String], default: 'id'},
        option_value: {type: [String], default: 'id'},
        required: {type: [Boolean], default: false},
    },
    data: () => ({
        tempValue: null,
        activeKeyCode: 0,
    }),
    mounted() {
        this.tempValue = (this.type === 'checkbox' || this.type === 'radio')
            ? this.value
            : (this.value) ? this.value.toString() : ''
        this.handleInput(this.tempValue, false)
    },
    methods: {
        getCaretPosition() {
            if (this.mask === false) {
                return
            }
            Masker.readCaretPosition(this.$refs.input)
        },

        handleKeyDown(e) {
            this.activeKeyCode = e.keyCode || e.charCode
            if (this.mask === false) {
                if (this.activeKeyCode === 8 && this.activeKeyCode === 46) {
                    this.handleInput(this.$refs.input.value)
                }
                return;
            }
            this.getCaretPosition()
        },

        handleInput(value, updateCaret) {
            // no mask was specified, save the new value to tempValue and emit another input event up the chain
            this.tempValue = value
            if (this.mask === false) {
                this.emitEvent('input', value)
                return;
            }

            // a mask was specified, if not deleting, apply the mask and update the input's value
            if (this.activeKeyCode !== 8 && this.activeKeyCode !== 46) {
                this.$refs.input.value = value = Masker.applyMask(Masker.removeMask(value, this.mask), this.mask)
                this.tempValue = value
                if (updateCaret !== false) Masker.updateCaretPosition(this.$refs.input, this.activeKeyCode)
            }

            // apply the save mask
            value = this.applySaveMask(value)

            // emit the formatted value up the chain
            this.emitEvent('input', value)
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

        handleCheckbox(event) {
            this.emitEvent('input', event.target.checked ? this.trueValue : this.falseValue)
        },

        handleBlur(event) {
            let newEvent = {
                target: {
                    id: event.target.id,
                    value: event.target.value
                }
            }

            if (this.mask) {
                newEvent.target.value = this.applySaveMask(newEvent.target.value)
            }

            this.emitEvent('blur', newEvent)
        },

        emitEvent(type, payload) {
            if (type === 'input') this.$emit('input', payload)

            this.$emit('event', {type, payload, target: this.id})
        }
    }
}

export default VuexInput;