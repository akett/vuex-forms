export default {
    props: {
        id: {type: String, default: null},
        name: {type: String, required: true},
        value: {type: [Number, Boolean, String], default: ''},
        label: {type: String, default: null},
        placeholder: {type: String, default: ''},
        required: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        errors: {type: [String, Object, Array], default: null},
    },
    data () {
        return {
            tempValue: null,
            activeKeyCode: 0,
        }
    },
    methods: {

        handleInput(event) {
            return this.inputEvent(event.target.value);
        },

        handleBlur(event) {
            return this.blurEvent(this.createEvent(event, 'blur'))
        },

        handleFocus(event) {
            return this.focusEvent(this.createEvent(event, 'focus'))
        },

        inputEvent(value) {
            this.tempValue = value
            this.emitEvent('input', value)
        },

        blurEvent(event) {
            this.emitEvent('blur', event)
        },

        focusEvent(event) {
            this.emitEvent('focus', event)
        },

        createEvent(event, type) {
            return {
                type,
                target: {
                    id: event.target.id,
                    value: event.target.value
                }
            }
        },

        emitEvent(type, payload) {
            // emit input event to enable v-model functionality
            if (type === 'input') this.$emit('input', payload)

            this.$emit('event', {type, payload, target: this.type === 'radio' ? this.name : this.id})
        }
    }
}