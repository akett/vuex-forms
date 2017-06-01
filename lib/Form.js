import Vue from "vue"
import Errors from "./Errors"
import {validationMixin} from "vuelidate"

export default class Form {
    constructor(instance, action, data, rules = null, messages = {}, options = {}) {
        this._store    = instance.$store
        this._action   = action
        this._messages = messages
        this._data     = Object.assign({}, {_original: data}, data);
        this.errors    = new Errors()
        this.options   = {
            validateOnInput: typeof options.validateOnInput !== 'undefined' ? options.validateOnInput : true,
            validateOnBlur: typeof options.validateOnBlur !== 'undefined' ? options.validateOnBlur : true,
            validateOnSubmit: typeof options.validateOnSubmit !== 'undefined' ? options.validateOnSubmit : true,
        }

        // define getters and setters for data fields on `this`,
        // so you can access your fields like so: {{ form.field1 }}
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                Object.defineProperty(this, field, {
                    get: function () {
                        return this._data[field]
                    },
                    set: function (value) {
                        this._data[field] = value
                    }
                })
            }
        }

        // create a new instance for Vuelidate to live in when validation rules are passed
        if (rules !== null) {
            this._validator = new Vue({
                store: instance.$store,
                mixins: [validationMixin],
                validations: rules,
                data: () => this._data
            })

            // define a getter for the Vuelidate object $v, for easy access like so: {{ form.$v }}
            Object.defineProperty(this, '$v', {
                get: () => this._validator.$v
            })
        }
    }

    hasValidator() {
        return typeof this.$v !== 'undefined'
    }

    data() {
        let data = {}
        for (let field in this._data._original) {
            data[field] = this._data[field]
        }

        return data
    }

    reset() {
        for (let field in this._data._original) {
            this._data[field] = null
        }

        this.errors.clear()

        this.onReset()
    }

    touch(target) {
        if (this.hasValidator() && this.$v.hasOwnProperty(target)) {
            this.$v[target].$touch()
            this.errors.check(this, target)
        }
    }

    listen(event) {
        if (typeof event !== 'object') return

        switch (event.type) {
            case 'input':
                if (this.hasValidator() && this.options.validateOnInput) {
                    this.touch(event.target)
                    this.errors.validate(this, event.target)
                }
                this.onInput(event.target, event.payload)
                break;
            case 'blur':
                if (this.hasValidator() && this.options.validateOnBlur) {
                    this.touch(event.target)
                    this.errors.validate(this, event.target)
                }
                this.onBlur(event.target, event.payload)
                break;
        }
    }

    submit() {
        // before submission, validate all the fields and abort if errors are found
        if (this.hasValidator() && this.options.validateOnSubmit) {
            // touch all the fields so they will be validated
            this.$v.$touch()
            // validate then reject if errors exist
            let errors = this.errors.validate(this)
            if (Object.keys(errors).length > 0) return Promise.reject(errors)
        }

        // dispatch the action with the data fields as the argument
        return new Promise((resolve, reject) => {
            return this._store.dispatch(this._action, this.data())
                .then(data => {
                    this.onSuccess(data)
                    resolve(data)
                })
                .catch(errors => {
                    this.onFail(errors)
                    reject(errors)
                })
        })
    }

    onSuccess(data) {
        this.errors.clear()
    }

    onFail(errors) {
        this.errors.clear()
        this.errors.record(errors)
    }

    onReset() {
        // do something after reset
    }

    onValidate() {
        // use to inject custom validation messages into the errors object
        // expects an object, keyed by the field name with an array of strings as the value
        return {}
    }

    onBlur(target, event) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }

    onInput(target, value) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }
}