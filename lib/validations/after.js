import {withParams, req} from 'vuelidate/lib/validators/common'

export default (after) => withParams(
    {type: 'after', after},
    value => {

    }
)