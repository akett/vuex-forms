import Errors from "./Errors"
import {validationMixin} from "vuelidate"
import validationMessages from "./lang/en/messages.js"

const defaultConfig = {
    vuexAction: false,
    ajaxURL: false,
    ajaxMethod: 'POST',
    ajaxTimeout: 10000,
    validations: null,
    defaultMessages: validationMessages,
    overrideMessages: {},
    validateOnInput: true,
    validateOnBlur: true,
    validateOnFocus: false,
    validateOnLoad: false,
    validateOnSubmit: true,
    touchOnBlur: false,
    touchOnFocus: false,
    inputDebounce: 200,
}

const VUEX_FORM = 'VUEX'
const AJAX_FORM = 'AJAX'

// thanks Vuelidate for the following
let _cachedVue = null
function getVue(rootVm) {
    if (_cachedVue) return _cachedVue
    let Vue = rootVm.constructor
    /* istanbul ignore next */
    while (Vue.super) Vue = Vue.super
    _cachedVue = Vue
    return Vue
}

export default class Form {
    constructor(vm, data, config = {}, apiHandler = null) {
        let Vue            = getVue(vm)
        // define all properties (for reference)
        this.errors        = new Errors()
        this.$bus          = new Vue()
        this._config       = {}
        this._data         = {}
        this._hasValidator = false
        this._submitter    = null
        this._vuex         = false
        this._ajax         = false
        this._timers       = {
            inputDebounce: 0,
        }

        this.setConfig(config)
        this.setupData(data)
        this.setupSubmitter(vm, apiHandler)
        this.setupValidator(Vue)

        // validate the form on load
        if (this._hasValidator && this._config.validateOnLoad) {
            this.$v.$touch()
            this.validate()
        }
    }

    /**
     * Applies any user-defined config options
     * @param config
     */
    setConfig(config = {}) {
        this._config = {}
        for (let option in defaultConfig) {
            if (defaultConfig.hasOwnProperty(option)) {
                this._config[option] = typeof config[option] === 'undefined' ? defaultConfig[option] : config[option]
            }
        }
    }

    /**
     * Clones the defined form data and sets up getters so the form fields can be accessed like so: form.my_form_field
     * @param data
     */
    setupData(data) {
        this._data = Object.assign({}, {_original: data}, data);
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
    }

    /**
     * Sets up the form submitter for either VUEX or AJAX
     * Note: if config options for both VUEX and AJAX are defined, VUEX takes precedence
     * @param vm
     * @param apiHandler
     */
    setupSubmitter(vm, apiHandler) {
        if (this._config.vuexAction === false && this._config.ajaxURL === false) {
            this._submitter = false;
            return
        }
        this._submitter = this._config.vuexAction !== false ? VUEX_FORM : AJAX_FORM
        // if vuex, save a reference to the $store
        // if ajax, save a reference to the API handler
        if (this._submitter === VUEX_FORM) {
            this._vuex = vm.$store
        } else {
            this._ajax = apiHandler
        }
    }

    /**
     * Sets up the Vuelidate VM if any validations were defined
     * @param Vue
     * @returns {*}
     */
    setupValidator(Vue) {
        // create a Vue instance for Vuelidate to live in
        if (this._config.validations !== null) {
            let validations   = this._config.validations;
            this._validations = {}

            this._hasValidator = true
            this._validator    = new Vue({
                mixins: [validationMixin],
                validations () {
                    // if the validations are in function form (typically used for Vuelidate's dynamic validations)
                    // call the function and pass an instance of `this` (the Vuelidate VM) to it
                    return typeof validations === 'function'
                        ? validations(this)
                        : validations
                },
                data: () => this._data
            })

            // define a getter for the Vuelidate object `$v` on the Form instance.
            Object.defineProperty(this, '$v', {
                get: () => this._validator.$v
            })

            this.parseValidations(typeof validations === 'function' ? validations(this._validator) : validations)
        }
    }

    /**
     * Looks for validation rules in nested data, saves a dot-notated path for any nested rules
     * @param validations
     * @param previousPath
     */
    parseValidations(validations, previousPath = null) {
        for (let field in validations) {
            if (validations.hasOwnProperty(field) && typeof validations[field] === 'object') {
                for (let possibleRule in validations[field]) {
                    if (validations[field].hasOwnProperty(possibleRule)) {
                        if (typeof validations[field][possibleRule] === 'function') {
                            let fieldMap = (previousPath !== null ? previousPath + '.' : '') + field

                            if (this._validations.hasOwnProperty(fieldMap)) {
                                this._validations[fieldMap].push(possibleRule)
                            } else {
                                this._validations[fieldMap] = [possibleRule]
                            }
                        } else {
                            this.parseValidations(validations[field][possibleRule], (previousPath !== null ? previousPath + '.' : '') + field + '.' + possibleRule)
                        }
                    }
                }
            }
        }
    }

    /**
     * Returns only the form data for convenience, useful for implementing your own submission logic
     * @returns {{}}
     */
    data() {
        let data = {}
        for (let field in this._data._original) {
            data[field] = this._data[field]
        }

        return data
    }

    /**
     * Clears any validation errors and sets the form data to null
     */
    reset() {
        for (let field in this._data._original) {
            if (this._data.hasOwnProperty(field)) {
                if (typeof this._data[field] === 'object') {
                    this.resetNestedData(this._data[field])
                } else {
                    this._data[field] = this._data._original[field]
                }
            }
        }

        this.errors.clear()

        if (this.hasValidator()) {
            this.$v.$reset()
        }

        this.$bus.$emit('reset')
    }

    /**
     * Loops through nested data, setting non-objects to null
     * @param dataObject
     */
    resetNestedData(dataObject) {
        for (let field in dataObject) {
            if (dataObject.hasOwnProperty(field)) {
                if (typeof dataObject[field] === 'object') {
                    this.resetNestedData(dataObject[field])
                } else {
                    dataObject[field] = this._data._original[field]
                }
            }
        }
    }

    /**
     * Submits the form using the submitter specified by the config options.
     * First it runs any client-side validation, and if no errors are found,
     * attempts to submit.
     * Returns false if no submitter was defined
     * @returns {*}
     */
    submit() {
        // before submission, validate all the fields and abort if errors are found
        if (this._hasValidator && this._config.validateOnSubmit) {
            // touch all the fields so they will be validated
            this.$v.$touch()
            // validate then reject if errors exist
            let errors = this.validate()
            if (Object.keys(errors).length > 0) return Promise.reject(errors)
        }

        if (this._submitter === false) {
            return false;
        }

        // dispatch the action with the data fields as the argument
        return new Promise((resolve, reject) => {
            return this._vuex.dispatch(this._config.vuexAction, this.data())
                .then(data => {
                    this.errors.clear()
                    resolve(data)
                })
                .catch(errors => {
                    // errors occurred, record them, make the fields dirty and emit a validate event
                    this.errors.clear()
                    this.errors.record(errors)
                    this.$v.$touch()
                    this.$bus.$emit('validate')
                    reject(errors)
                })
        })
    }

    /**
     * Receives form events and then validates the target field (if it has any validations)
     * @param event
     */
    listen(event) {
        if (typeof event !== 'object') return

        let field = (this.hasValidator(event.field))
            ? event.field.indexOf('.') !== -1
                        ? event.field.split('.').reduce((o, i) => o[i], this.$v)
                        : this.$v[event.field]
            : false

        switch (event.type) {
            case 'input':
                if (this.hasValidator(event.field)) {
                    field.$touch()
                    if (this._config.validateOnInput) {
                        clearTimeout(this._timers.inputDebounce)
                        this._timers.inputDebounce = setTimeout(() => this.validate(event.field), this._config.inputDebounce)
                    }
                }
                this.$bus.$emit('input', event)
                break;
            case 'blur':
                if (this.hasValidator(event.field)) {
                    if (this._config.touchOnBlur) field.$touch()
                    if (this._config.validateOnBlur) this.validate(event.field)
                }
                this.$bus.$emit('blur', event)
                break;
            case 'focus':
                if (this.hasValidator(event.field)) {
                    if (this._config.touchOnFocus) field.$touch()
                    if (this._config.validateOnFocus) this.validate(event.field)
                }
                this.$bus.$emit('focus', event)
                break;
        }
    }

    /**
     * Helper method to quickly check if this form has validation rules
     * @param field
     * @returns {boolean}
     */
    hasValidator(field = null) {
        return field !== null
            ? this._hasValidator && this._validations.hasOwnProperty(field)
            : this._hasValidator
    }

    /**
     * Reads any validation errors given by Vuelidate and translates them into validation messages
     * Specify a targetField to limit the generation of validation messages to one field
     * @param targetField
     * @returns {*}
     */
    validate(targetField = null) {
        // if there is no validator or the validator is reporting no errors, abort
        if (!this._hasValidator || this.$v.$errors === false) return false

        // clear all validation messages before validation
        this.errors.clear(targetField)

        let validations = targetField !== null
            ? {[targetField]: targetField}
            : this._validations

        let errors = {}
        for (let field in validations) {
            let validation = field.indexOf('.') !== -1
                ? field.split('.').reduce((o, i) => o[i], this.$v)
                : this.$v[field]

            // only continue if the validator reports that the field has an error
            if (typeof validation === 'object' && validation.$error === true) {

                // loop through each rule and translate any errors into messages
                let messages = []
                for (let rule in validation.$params) {
                    // only continue if the validator reports a false value for this rule
                    if (validation.hasOwnProperty(rule) && validation[rule] === false) {

                        // get the override message for the [field][rule] pair if it exists, or use the default
                        // message for the rule. If a message can't be resolved, use a generic default instead.
                        let message = (this._config.overrideMessages[field] && this._config.overrideMessages[field][rule])
                            ? this._config.overrideMessages[field][rule]
                            : (this._config.defaultMessages[rule])
                                          ? this._config.defaultMessages[rule]
                                          : 'The :attribute field has an error';

                        // get any params for the rule, if available
                        let params = Object.assign({}, validation.$params[rule]);
                        // remove the type attribute from the params list
                        if (params !== null && params.type) delete params.type

                        // now, replace the :attribute placeholder with the field name
                        // convert any and all underscores in the field name to spaces
                        let fieldName = field.indexOf('.') !== -1
                            ? field.split('.').reverse()[0]
                            : field;
                        message       = message.replace(":attribute", fieldName.replace(/_/g, ' '))

                        // finally, replace any and all :param placeholders with the param's value
                        for (let param in params) {
                            if (params.hasOwnProperty(param)) {
                                let replaceWith = JSON.parse(JSON.stringify(params[param]))
                                if (param === 'array') {
                                    let lastEl = replaceWith[replaceWith.length - 1]
                                    replaceWith.splice(replaceWith.indexOf(lastEl), 1)
                                    replaceWith = replaceWith.join(', ') + ' or ' + lastEl
                                }
                                message = message.replace(":" + param, replaceWith)
                            }
                        }

                        messages.push(message)
                    }
                }

                errors[field] = messages
            }
        }

        this.errors.record(errors)

        this.$bus.$emit('validate')

        return errors
    }
}