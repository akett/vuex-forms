<template>
    <div class="form-group">
        <label :for="id">
            <input ref="input"
                   :id="id"
                   :name="name"
                   type="checkbox"
                   :value="value"
                   :checked="value === trueValue"
                   :required="required"
                   @change="handleCheckbox"
                   class="form-control">
            {{ label }}
        </label>
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="error in fieldErrors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
    import VuexCheckboxMixin from "./mixins/vuex-checkbox"
    export default {
        name: 'VuexCheckbox',
        mixins: [VuexCheckboxMixin()]
    }
</script>