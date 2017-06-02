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