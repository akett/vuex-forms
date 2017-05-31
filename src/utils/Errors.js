import validationMessages from "../lang/en/validation-messages.js"
export default class Errors {
    constructor() {
        this.bag = {}
    }

    get(field) {
        return this.bag.hasOwnProperty(field)
            ? this.bag[field]
            : null
    }

    has(field) {
        return this.bag.hasOwnProperty(field)
    }

    any() {
        return Object.keys(this.bag).length > 0
    }

    all() {
        let errors = {}
        for (let field in this.bag) {
            if (this.bag.hasOwnProperty(field)) {
                errors[field] = this.bag[field]
            }
        }

        return errors
    }

    // checks a field for errors
    check(form, field) {
        if (form.hasValidator() && form.$v.hasOwnProperty(field)) {
            if (form.$v[field].$error === false) {
                this.clear(field)
            }
        }
    }

    // checks fields for validation errors and translates the errors into validation messages
    validate(form, targetField = null) {
        if (!form.hasValidator() || form.$v.$errors === false) return false

        // clear errors before validation
        this.clear(targetField)

        // if targetField is specified, limit validations array to just that field
        let validations = targetField === null
            ? form._validator.$options.validations
            : {[targetField]: form._validator.$options.validations[targetField]}

        let errors = {}
        for (let field in validations) {
            if (form.$v.hasOwnProperty(field) && form.$v[field].$error === true) {
                let messages = []
                // loop through each rule and check its value in vuelidate
                // false values means no errors
                let rules = validations[field]
                for (let rule in rules) {
                    if (rules.hasOwnProperty(rule) && form.$v[field][rule] === false) {
                        let baseMessage = (form.overrideMessages[field] && form.overrideMessages[field][rule])
                            ? form.overrideMessages[field][rule]
                            : validationMessages[rule];
                        let message     = baseMessage.replace(":input", field.replace(/_/g, ' '))
                        let params      = form.$v[field].$params[rule];
                        for (let param in params) {
                            if (params.hasOwnProperty(param) && param !== 'type') {
                                message = message.replace(":" + param, params[param])
                            }
                        }
                        messages.push(message)
                    }
                }

                errors[field] = messages
            }
        }

        // combine additional error messages from onValidate() with validator messages
        errors = Object.assign({}, errors, form.onValidate())

        this.record(errors)

        return errors
    }

    record(errors) {
        if (errors.length < 1) return
        // use a new errors object to trigger reactivity in forms
        let newErrors = {}

        // copy any existing errors
        for (let error in this.bag) {
            newErrors[error] = this.bag[error]
        }
        // add new errors
        for (let field in errors) {
            newErrors[field] = errors[field]
        }

        this.bag = newErrors;
    }

    clear(field) {
        // removing errors requires a whole new object in order to trigger reactivity
        if (field) {
            let newErrors = {}
            for (let error in this.bag) {
                if (this.bag.hasOwnProperty(error) && field !== error) {
                    newErrors[error] = this.bag[error]
                }
            }
            this.bag = newErrors;
        } else {
            this.bag = {}
        }
    }
}