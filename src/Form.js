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
        // define core properties (mostly for reference)
        this.errors        = new Errors()
        this._config       = {}
        this._data         = {}
        this._submitter    = null
        this._hasValidator = false
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

    setConfig(config = {}) {
        this._config = {}
        for (let option in defaultConfig) {
            if (defaultConfig.hasOwnProperty(option)) {
                this._config[option] = typeof config[option] === 'undefined' ? defaultConfig[option] : config[option]
            }
        }
    }

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

    // Sets the submitter type - vuex or ajax - and prepares the Vuex store or whatever apiHandler you specified
    // Note: this will give priority to Vuex if config options for both Vuex and AJAX are passed.
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
            this._api = apiHandler
        }
    }

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

    // use a level count to construct an array of possible validations
    parseValidations(validations, previousMap = null) {
        for (let field in validations) {
            if (validations.hasOwnProperty(field) && typeof validations[field] === 'object') {
                for (let possibleRule in validations[field]) {
                    if (validations[field].hasOwnProperty(possibleRule)) {
                        if (typeof validations[field][possibleRule] === 'function') {
                            let fieldMap = (previousMap !== null ? previousMap + '.' : '') + field

                            if (this._validations.hasOwnProperty(fieldMap)) {
                                this._validations[fieldMap].push(possibleRule)
                            } else {
                                this._validations[fieldMap] = [possibleRule]
                            }
                        } else {
                            this.parseValidations(validations[field][possibleRule], (previousMap !== null ? previousMap + '.' : '') + field + '.' + possibleRule)
                        }
                    }
                }
            }
        }
    }

    // Returns only the form data for convenience
    data() {
        let data = {}
        for (let field in this._data._original) {
            data[field] = this._data[field]
        }

        return data
    }

    // RESET ----
    // Clears any validation errors and sets the form data to null.
    // NOTE: input components that make use of a `tempValue` can only have their values cleared if they
    // ----- are wrapped in a <form> tag and you use an HTML reset button to call this method.
    // Example:
    // <form>
    //   <tempvalue-input-component></tempvalue-input-component>
    //   <button type="reset" @click="form.reset()">Reset</button>
    //   <!-- Make sure not to use @click.prevent -->
    // </form>
    reset() {
        for (let field in this._data._original) {
            if (this._data.hasOwnProperty(field)) {
                if (typeof this._data[field] === 'object') {
                    this.resetNestedData(this._data[field])
                } else {
                    this._data[field] = null
                }
            }
        }

        this.errors.clear()

        if (this.hasValidator()) {
            this.$v.$reset()
        }

        this.onReset()
    }

    resetNestedData(dataObject) {
        for (let field in dataObject) {
            if (dataObject.hasOwnProperty(field)) {
                if (typeof dataObject[field] === 'object') {
                    this.resetNestedData(dataObject[field])
                } else {
                    dataObject[field] = null
                }
            }
        }
    }

    // Submits the form using the submitter you specified in the config
    submit() {
        // before submission, validate all the fields and abort if errors are found
        if (this._hasValidator && this._config.validateOnSubmit) {
            // touch all the fields so they will be validated
            this.$v.$touch()
            // validate then reject if errors exist
            let errors = this.validate()
            if (Object.keys(errors).length > 0) return Promise.reject(errors)
        }

        // dispatch the action with the data fields as the argument
        return new Promise((resolve, reject) => {
            return this._vuex.dispatch(this._config.vuexAction, this.data())
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

    /**
     * Listens for form events and handles them according.
     *
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
                this.onInput(event.field, event.payload)
                break;
            case 'blur':
                if (this.hasValidator(event.field)) {
                    if (this._config.touchOnBlur) field.$touch()
                    if (this._config.validateOnBlur) this.validate(event.field)
                }
                this.onBlur(event.field, event.payload)
                break;
            case 'focus':
                if (this.hasValidator(event.field)) {
                    if (this._config.touchOnFocus) field.$touch()
                    if (this._config.validateOnFocus) this.validate(event.field)
                }
                this.onFocus(event.field, event.payload)
                break;
        }
    }

    // checks if the form is under any validation, optionally check if a specific field is under validation
    hasValidator(field = null) {
        return field !== null
            ? this._hasValidator && this._validations.hasOwnProperty(field)
            : this._hasValidator
    }

    // Reads the validation errors and translates them into validation messages
    // - use targetField to only read messages for that field
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
                                message = message.replace(":" + param, params[param])
                            }
                        }

                        messages.push(message)
                    }
                }

                errors[field] = messages
            }
        }

        // combine any additional error messages from onValidate() with the translated messages
        errors = Object.assign({}, errors, this.onValidate())

        this.errors.record(errors)

        return errors
    }

    onInput(target, event) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }

    onFocus(target, event) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }

    onBlur(target, event) {
        // do something with event - {target:{id: ID, value: VALUE}}
    }

    onReset() {
        // do something after reset
    }

    onValidate() {
        // use to inject custom validation messages into the errors object
        // expects an object, keyed by the field name with an array of strings as the value
        return {}
    }

    onSuccess(data) {
        this.errors.clear()
    }

    onFail(errors) {
        this.errors.clear()
        this.errors.record(errors)
    }
}