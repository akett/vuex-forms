import {withParams, req} from 'vuelidate/lib/validators/common'

export default (min, max) => withParams(
    {type: 'betweenLength', min, max},
    value => req(value) ? (value.length) ? (value.length >= min && value.length <= max) : false : true
)