<template>
    <div class="columns form is-desktop" v-if="form !== null">
        <div class="column is-6">

            <div class="has-text-centered" v-if="saved">
                <h2>Server-side validations passed!</h2>
            </div>
            <form name="example-form-2" @submit.prevent="submitForm">

                <vuex-text type="number"
                           label="Minimum Name Length"
                           id="nameLength"
                           name="nameLength"
                           v-model="form.nameLength"
                           :errors="form.errors.get('nameLength')"
                           @event="form.listen($event)"
                ></vuex-text>

                <vuex-text label="Name"
                           id="name"
                           name="name"
                           v-model.trim="form.name"
                           :errors="form.errors.get('name')"
                           @event="form.listen($event)"
                ></vuex-text>

                <div class="has-text-centered">
                    <button type="submit" class="button">Submit</button>
                    <button type="reset" class="button" @click="form.reset()">Reset</button>
                </div>
            </form>
        </div>
        <div class="column is-6">

            <pre>{{ form.data() }}</pre>

            <validation-options :form="form"></validation-options>
        </div>
    </div>
</template>

<script>
    import {Form} from "../../lib"
    import {required, minLength} from "../../lib/validations"
    export default {
        name: 'FormExample2',
        data () {
            return {
                form: new Form(this, {
                    nameLength: 2,
                    name: '',
                }, {
                    vuexAction: 'SUBMIT_FORM',
                    validations: (validator) => {
                        return {
                            nameLength: {required},
                            name: {
                                required,
                                minLength: minLength(parseInt(validator.nameLength))
                            }
                        }
                    }
                }),
                saved: false,
            }
        },
        methods: {
            submitForm() {
                this.form.submit().then(validatedData => {
                    this.saved = true
                    setTimeout(() => {
                        this.saved = false
                    }, 2000)
                }).catch(errorData => {
                    console.log('that didn\'t work')
                })
            }
        }
    }
</script>