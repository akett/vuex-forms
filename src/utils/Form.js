import Errors from "./Errors"
import {validateModel} from "vuelidate"
import Vue from "vue"

export default class Form {
    constructor(instance, data, action, validations = null) {
        // setup a vue instance for vuelidate
        this._vm     = new Vue({
            store: instance.$store,
            data () {
                return Object.assign({}, {
                    _action: action,
                    _original: data,
                    _validations: validations
                }, data);
            },
        })
        this._action = action

        this._vm.$v  = validations !== null ? validateModel(this._vm, validations) : false

        // define getters and setters for the passed data fields
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                Object.defineProperty(this, field, {
                    get: function () {
                        return this._vm[field]
                    },
                    set: function (value) {
                        this._vm[field] = value
                    }
                })
            }
        }

        this.errors = new Errors(this._vm)

        if (this._vm.$v !== false) {
            setTimeout(function () {
                this._vm.$v.$reset()
            }.bind(this), 0)
        }
    }


    data() {
        let data = {}
        for (let field in this._vm._data._original) {
            data[field] = this._vm[field]
        }

        return data
    }

    reset() {
        for (let field in this._vm._original) {
            this[field] = ''
        }

        this.errors.clear()

        this.onReset()
    }

    touch(target) {
        if (this._vm.$v !== false && this._vm.$v.hasOwnProperty(target)) {
            this._vm.$v[target].$touch()
            this.errors.check(target)
        }
    }

    listen(form, event) {
        if (typeof event !== 'object') return

        if (event.type === 'input') {
            if (form._vm.$v !== false) {
                form.touch(event.target)
            }
            form.onInput(event.target, event.payload)
        }

        if (event.type === 'blur') {
            if (form._vm.$v !== false) {
                form.touch(event.target)
                form.errors.validate()
            }
            form.onBlur(event.target, event.payload)
        }
    }

    submit() {
        // touch every field to make them dirty
        if (this._vm.$v !== false) this._vm.$v.$touch()
        // check every field for errors and update the error messages
        let errors = this.errors.validate()
        // if errors are detected reject before the API call
        if (Object.keys(errors).length > 0) return Promise.reject()

        // return a promise that dispatches the vuex action
        return new Promise((resolve, reject) => {
            return this._vm.$store.dispatch(this._action, {fields: this.data()})
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

    onBlur(target, event) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }

    onInput(target, value) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }
}