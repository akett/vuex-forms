import {ref, req, withParams} from 'vuelidate/lib/validators/common'

export default notEqualTo => withParams(
    {type: 'differentFrom', neq: notEqualTo},
    function (value, parentVm) {
        if(!req(value)) return true
        let neqField = ref(notEqualTo, this, parentVm);
        neqField     = neqField.toLowerCase() ? neqField.toLowerCase() : neqField
        let compare  = value.toLowerCase() ? value.toLowerCase() : value
        return compare !== neqField
    }
)
