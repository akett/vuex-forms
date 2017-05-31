<template>
    <span>
        <select v-if="type === 'select'"
                :id="id"
                v-model="tempValue"
                @change="handleInput($event.target.value)"
                @blur="handleBlur"
                class="form-control">
            <option v-for="option in options" :value="option[option_value]" v-text="option[option_name]"></option>
        </select>

        <input v-if="type === 'checkbox'"
               ref="input"
               :id="id"
               :type="type"
               :value="tempValue"
               :checked="value === true"
               @change="handleCheckbox"
               @blur="handleBlur"
               class="form-control">

        <textarea v-if="type === 'textarea'"
                  ref="input"
                  :id="id"
                  :placeholder="placeholder"
                  v-model="tempValue"
                  @input="handleInput($event.target.value)"
                  @keydown="handleKeyDown($event)"
                  @blur="handleBlur"
                  class="form-control"></textarea>

        <input v-if="type !== 'select' &&
                     type !== 'textarea' &&
                     type !== 'radio' &&
                     type !== 'checkbox'"
               ref="input"
               :id="id"
               :type="type"
               :value="tempValue"
               :placeholder="placeholder"
               @input="handleInput($event.target.value)"
               @keydown="handleKeyDown($event)"
               @blur="handleBlur"
               class="form-control">
    </span>
</template>

<script>
    import VuexInput from "../mixins/vuex-input";
    export default {
        name: 'VuexInput',
        mixins: [VuexInput],
    };
</script>