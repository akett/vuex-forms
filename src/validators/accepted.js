import {withParams, req} from 'vuelidate/lib/validators/common'

export default withParams(
    {type: 'accepted'},
    value => value === true || parseInt(value) === 1 || String(value).toLowerCase() === 'yes' || String(value).toLowerCase() === 'on'
)