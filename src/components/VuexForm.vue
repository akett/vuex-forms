<template>
    <div>
        <div class="form-group">
            <label for="field1">Field 1</label>
            <vuex-input id="field1"
                        type="text"
                        v-model="form.field1"
                        :error="form.errors.get('field1')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
        <div class="form-group">
            <label for="field1">Field 2</label>
            <vuex-input id="field2"
                        type="text"
                        v-model="form.field2"
                        :error="form.errors.get('field2')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
        <div class="form-group">
            <label for="field1">Field 3</label>
            <vuex-input id="field3"
                        type="text"
                        v-model="form.field3"
                        :error="form.errors.get('field3')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
        <div class="form-group">
            <label for="field1">Field 4</label>
            <vuex-input id="field4"
                        type="text"
                        v-model="form.field4"
                        :error="form.errors.get('field4')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
        <div class="form-group">
            <label for="field1">Field 5</label>
            <vuex-input id="field5"
                        type="text"
                        v-model="form.field5"
                        :error="form.errors.get('field5')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
        <div class="form-group">
            <label for="field1">Field 6</label>
            <vuex-input id="field6"
                        type="text"
                        v-model="form.field6"
                        :error="form.errors.get('field6')"
                        @event="form.listen(form, $event)"
                        :required="false"></vuex-input>
        </div>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators"
    import Form from "../utils/Form"
    export default {
        name: 'VuexForm',
        data () {
            return {
                form: new Form(this, this.$store.state.formTest, 'UPDATE_FORM'),
            }
        },
        methods: {}
    }
</script>