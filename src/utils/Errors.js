import validationMessages from "../lang/en/validation-messages.js"
export default class Errors {
    constructor (vm) {
        this._vm    = vm;
        this.errors = {}
    }

    get (field) {
        if (this.errors[field]) {
            return this.errors[field]
        }
    }

    has (field) {
        return this.errors.hasOwnProperty(field)
    }

    any () {
        return Object.keys(this.errors).length > 0
    }

    all () {
        let errors = {}
        for (let field in this.errors) {
            errors[field] = this.errors[field]
        }

        return errors
    }

    // checks a field for errors
    check (field) {
        if (this._vm._data._validations.hasOwnProperty(field)) {
            if (this._vm.$v[field].$error === false) {
                this.clear(field)
            }
        }
    }

    // checks every field for errors in vuelidate then translates them to error messages and records them to errors object
    validate () {
        if (this._vm.$v === false || this._vm.$v.$errors === false) return false

        this.clear()

        let results = {}
        for (let field in this._vm._data._validations) {
            if (this._vm._data._validations.hasOwnProperty(field)) {

                // if the field has an $error
                if (this._vm.$v[field].$error) {
                    let errors = []
                    // loop through each rule and check its value in vuelidate
                    // false values means no errors
                    let rules = this._vm._data._validations[field]
                    for (let rule in rules) {
                        if (this._vm.$v[field][rule] == false) {
                            errors.push(validationMessages[rule].replace(":field", field.replace(/_/g, ' ')))
                        }
                    }

                    results[field] = errors
                }
            }
        }

        results = Object.assign({}, results, this.onValidate())

        this.record(results)

        return results
    }

    record (errors) {
        if (errors.length > 1) return
        // use a new errors object to trigger reactivity in forms
        let newErrors = {}

        // copy any existing errors
        for (let error in this.errors) {
            newErrors[error] = this.errors[error]
        }
        // add new errors
        for (let field in errors) {
            newErrors[field] = errors[field]
        }

        this.errors = newErrors;
    }

    clear (field) {
        if (field) {
            let newErrors = {}
            for (let error in this.errors) {
                if (field !== error) {
                    newErrors[error] = this.errors[error]
                }
            }
            this.errors = newErrors;
        } else {
            this.errors = new Object
        }
    }

    onValidate () {
        // inject validation messages into the errors object
        return {}
    }
}