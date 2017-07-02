import {regex} from 'vuelidate/lib/validators/common'

export default regex('ipv4', /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/)