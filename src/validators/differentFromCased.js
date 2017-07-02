import {ref, withParams} from 'vuelidate/lib/validators/common'

export default notEqualTo => withParams(
    {type: 'differentFromCased', neq: notEqualTo},
    function (value, parentVm) {
        return value !== ref(notEqualTo, this, parentVm);
    }
)
