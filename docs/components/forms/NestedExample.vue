<template>
    <div class="columns is-desktop">
        <div class="column is-6">
            <form name="example-form" @submit.prevent="form.submit()">

                <vuex-text label="Name"
                           id="name"
                           name="name"
                           v-model="form.name"
                           :errors="form.errors.get('name')"
                           @event="form.listen($event)"
                ></vuex-text>

                <vuex-text label="Nested Name"
                           id="nested.data.is.nested.name"
                           name="nested.data.is.nested.name"
                           v-model="form.nested.data.is.nested.name"
                           :errors="form.errors.get('nested.data.is.nested.name')"
                           @event="form.listen($event)"
                ></vuex-text>

                <vuex-text label="Nested City"
                           id="nested.data.is.nested.city"
                           name="nested.data.is.nested.city"
                           v-model="form.nested.data.is.nested.city"
                           :errors="form.errors.get('nested.data.is.nested.city')"
                           @event="form.listen($event)"
                ></vuex-text>

                <div class="has-text-centered">
                    <button type="submit" class="button">Submit</button>
                    <button type="reset" class="button" @click="form.reset()">Reset</button>
                </div>
            </form>
        </div>
        <div class="column is-6">

            <h3>Schema</h3>

            <pre>{{ form.data() }}</pre>

            <validation-options :form="form"></validation-options>
        </div>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import {required, minLength} from "../../../src/validators"
    export default {
        name: 'NestedExample',
        data () {
            return {
                form: new Form(this, {
                    name: '',
                    nested: {
                        data: {
                            is: {
                                nested: {
                                    name: '',
                                    city: '',
                                }
                            }
                        }
                    }
                }, {
                    vuexAction: 'SUBMIT_FORM',
                    validations: {
                        name: {required},
                        nested: {
                            data: {
                                is: {
                                    nested: {
                                        name: {required},
                                        city: {required},
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    }
</script>