import {withParams, req} from 'vuelidate/lib/validators/common'

export default (array) => withParams(
    {type: 'inArray', array},
    value => {
        if (!req(value)) return true
        return array.indexOf(value) === -1
    }
)