<template>
    <div class="form-group">
        <span v-if="type === 'radio'">
            <label v-html="label"></label>
            <label v-for="option in options" :for="name + option[option_name]">
                <input :type="type"
                       :name="name"
                       :id="name + option[option_name]"
                       :value="option[option_value]"
                       :checked="value === option[option_value]"
                       @change="handleRadio"
                       class="form-control">
                {{ option[option_name] }}
            </label>
        </span>
        <span v-else-if="type === 'checkbox'">
            <label :for="id">
                <input ref="input"
                       :id="id"
                       :name="name"
                       :type="type"
                       :value="value"
                       :checked="value === trueValue"
                       :required="required"
                       @change="handleCheckbox"
                       class="form-control">
                {{ label }}
            </label>
        </span>
        <span v-else>
            <label v-if="label" :for="id" v-html="label"></label>

            <select v-if="type === 'select'"
                    :id="id"
                    :name="name"
                    :value="value"
                    :required="required"
                    @change="handleInput($event.target.value)"
                    @blur="handleBlur"
                    @focus="handleFocus"
                    class="form-control">
                <option v-for="option in options" :value="option[option_value]" v-text="option[option_name]"></option>
            </select>

            <textarea v-if="type === 'textarea'"
                      ref="input"
                      :id="id"
                      :name="name"
                      :value="tempValue"
                      :placeholder="placeholder"
                      :required="required"
                      @input="handleInput($event.target.value)"
                      @keydown="handleKeyDown($event)"
                      @blur="handleBlur"
                      @focus="handleFocus"
                      class="form-control"></textarea>

            <input v-if="type !== 'select' && type !== 'textarea'"
                   ref="input"
                   :id="id"
                   :name="name"
                   :type="type"
                   :value="tempValue"
                   :placeholder="placeholder"
                   :required="required"
                   @input="handleInput($event.target.value)"
                   @keydown="handleKeyDown($event)"
                   @blur="handleBlur"
                   @focus="handleFocus"
                   class="form-control">
        </span>
        <ul class="form-errors" v-if="errors">
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
    import VuexInputMixin from "./mixins/vuex-input"
    export default {
        name: 'VuexInput',
        mixins: [VuexInputMixin]
    }
</script>