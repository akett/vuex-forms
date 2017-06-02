import {regex} from 'vuelidate/lib/validators/common'

export default regex('alphaDash', /^[a-zA-Z0-9_-]*$/)