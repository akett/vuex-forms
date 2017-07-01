<template>
    <div>
        <h2>Complete Form</h2>
        <p>
            A full featured form - lots of fields, validations, and it submits to a server for validation!
            Open up your DevTools and check the Network tab to see what kind of response is required for server-side
            validation messages.
        </p>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">

                    <div class="has-text-centered" v-if="saved">
                        <h3>Server-side validations passed!</h3>
                    </div>
                    <form name="example-form" @submit.prevent="submitForm">

                        <div class="columns">
                            <div class="column is-6">
                                <vuex-text label="Name"
                                           id="name"
                                           name="name"
                                           v-input-sync:name="form"
                                ></vuex-text>

                                <vuex-text type="email"
                                           label="Email"
                                           id="email"
                                           name="email"
                                           v-input-sync:email="form"
                                ></vuex-text>

                                <vuex-text type="tel"
                                           mask="(###) ###-####"
                                           label="Phone"
                                           id="phone"
                                           name="phone"
                                           v-input-sync:phone="form"
                                ></vuex-text>

                                <vuex-text label="City"
                                           id="city"
                                           name="city"
                                           v-input-sync:city="form"
                                ></vuex-text>

                                <vuex-select label="State"
                                             id="state"
                                             name="state"
                                             :options="states"
                                             option_name="name"
                                             option_value="abbr"
                                             v-input-sync:state="form"
                                ></vuex-select>

                                <vuex-text label="Zip Code"
                                           mask="#####-####"
                                           :save-mask="true"
                                           id="zip"
                                           name="zip"
                                           v-input-sync:zip="form"
                                ></vuex-text>

                            </div>
                            <div class="column is-6">

                                <vuex-text label="Favorite Website"
                                           placeholder="http://"
                                           id="website"
                                           name="website"
                                           v-input-sync:website="form"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Password"
                                           id="password"
                                           name="password"
                                           v-input-sync:password="form"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Confirm Password"
                                           id="password_confirmation"
                                           name="password_confirmation"
                                           v-input-sync:password_confirmation="form"
                                ></vuex-text>

                                <vuex-radio label="Shipping Method"
                                            id="shipping_method"
                                            name="shipping_method"
                                            :options="shipping_options"
                                            option_name="name"
                                            option_value="value"
                                            v-input-sync:shipping_method="form"
                                ></vuex-radio>

                                <vuex-checkbox label="Receive Updates"
                                               id="receive_updates"
                                               name="receive_updates"
                                               v-input-sync:receive_updates="form"
                                ></vuex-checkbox>

                                <vuex-checkbox label="I agree the Terms & Conditions"
                                               id="terms_and_conditions"
                                               name="terms_and_conditions"
                                               v-input-sync:terms_and_conditions="form"
                                ></vuex-checkbox>

                            </div>
                        </div>

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

            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang"></code></pre>
            </div>
        </doc-example>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import states from "../../store/static/us-states";
    export default {
        name: 'CompleteForm',
        data () {
            return {
                form: new Form(this, this.$store.state.formTest, {
                    vuexAction: 'SUBMIT_FORM',
                    validations: this.$store.state.formTestRules,
                }),
                states: states,
                shipping_options: [
                    {name: 'Ground', value: 'Ground'},
                    {name: '2 Day', value: '2 Day'},
                    {name: 'Next Day', value: 'Next Day'},
                ],
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