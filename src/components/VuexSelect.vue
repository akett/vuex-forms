<template>
    <div class="form-group">
        <label v-if="label" :for="id" v-html="label"></label>

        <select :id="id"
                :name="name"
                :value="value"
                :multiple="multiple"
                :disabled="disabled"
                :required="required"
                @change="handleInput"
                @blur="handleBlur"
                @focus="handleFocus"
                class="form-control">
            <option v-for="option in options" :value="option[option_value]" v-text="option[option_name]"></option>
        </select>
        <ul class="form-errors" v-if="errors">
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
    import VuexSelectMixin from "./mixins/vuex-select"
    export default {
        name: 'VuexSelect',
        mixins: [VuexSelectMixin()]
    }
</script>