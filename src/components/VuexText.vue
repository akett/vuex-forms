<template>
    <div class="form-group">
        <label v-if="label" :for="id" v-html="label"></label>

        <textarea v-if="type === 'textarea'"
                  ref="input"
                  :id="id"
                  :name="name"
                  v-model="tempValue"
                  :placeholder="placeholder"
                  :required="required"
                  @input="handleInput"
                  @keydown="handleKeyDown"
                  @blur="handleBlur"
                  @focus="handleFocus"
                  class="form-control"></textarea>

        <input v-if="type !== 'textarea'"
               ref="input"
               :id="id"
               :name="name"
               :type="type"
               :value="tempValue"
               :placeholder="placeholder"
               :required="required"
               :disabled="disabled"
               @input="handleInput"
               @keydown="handleKeyDown"
               @blur="handleBlur"
               @focus="handleFocus"
               class="form-control">
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="error in fieldErrors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
    import VuexTextMixin from "../mixins/vuex-text"
    export default {
        name: 'VuexText',
        mixins: [VuexTextMixin()]
    }
</script>