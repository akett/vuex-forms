export default {
    props: {
        id: {type: String, default: null},
        name: {type: String, required: true},
        label: {type: String, default: null},
        placeholder: {type: String, default: null},
        required: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        errors: {type: [String, Object, Array], default: null},
    },
    data: () => ({
        masker: false,
        value: null,
        activeKeyCode: 0,
        localErrors: null
    }),
    computed: {
        fieldErrors() {
            return this.errors || this.localErrors
        }
    },
    methods: {

        handleInput(event) {
            return this.inputEvent(this.createEvent(event, 'input'));
        },

        handleBlur(event) {
            return this.blurEvent(this.createEvent(event, 'blur'))
        },

        handleFocus(event) {
            return this.focusEvent(this.createEvent(event, 'focus'))
        },

        inputEvent(event) {
            this.value = event.target.value
            this.emitEvent('input', event)
        },

        blurEvent(event) {
            this.emitEvent('blur', event)
        },

        focusEvent(event) {
            this.emitEvent('focus', event)
        },

        createEvent(event, type, overrideValue = null) {
            return {
                type,
                target: {
                    id: event.target.id,
                    name: event.target.name,
                    value: overrideValue ? overrideValue : event.target.value
                }
            }
        },

        emitEvent(type, payload) {
            // emit input event for v-model
            if (type === 'input') this.$emit('input', payload.target.value)

            this.$emit('event', {type, field: this.name, payload})
        }
    }
}