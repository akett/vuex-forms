<template>
    <div>
        <h2>Complete Form</h2>
        <p></p>
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
                                           v-model="form.name"
                                           :errors="form.errors.get('name')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="email"
                                           label="Email"
                                           id="email"
                                           name="email"
                                           v-model="form.email"
                                           :errors="form.errors.get('email')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="tel"
                                           mask="(###) ###-####"
                                           label="Phone"
                                           id="phone"
                                           name="phone"
                                           v-model="form.phone"
                                           :errors="form.errors.get('phone')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text label="City"
                                           id="city"
                                           name="city"
                                           v-model="form.city"
                                           :errors="form.errors.get('city')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-select label="State"
                                             id="state"
                                             name="state"
                                             :options="states"
                                             option_name="name"
                                             option_value="abbr"
                                             v-model="form.state"
                                             :errors="form.errors.get('state')"
                                             @event="form.listen($event)"
                                ></vuex-select>

                                <vuex-text label="Zip Code"
                                           mask="#####-####"
                                           :save-mask="true"
                                           id="zip"
                                           name="zip"
                                           v-model="form.zip"
                                           :errors="form.errors.get('zip')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                            </div>
                            <div class="column is-6">

                                <vuex-text label="Favorite Website"
                                           placeholder="http://"
                                           id="website"
                                           name="website"
                                           v-model="form.website"
                                           :errors="form.errors.get('website')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Password"
                                           id="password"
                                           name="password"
                                           v-model="form.password"
                                           :errors="form.errors.get('password')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Confirm Password"
                                           id="password_confirmation"
                                           name="password_confirmation"
                                           v-model="form.password_confirmation"
                                           :errors="form.errors.get('password_confirmation')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-radio label="Shipping Method"
                                            id="shipping_method"
                                            name="shipping_method"
                                            :options="shipping_options"
                                            option_name="name"
                                            option_value="value"
                                            v-model="form.shipping_method"
                                            :errors="form.errors.get('shipping_method')"
                                            @event="form.listen($event)"
                                ></vuex-radio>

                                <vuex-checkbox label="Receive Updates"
                                               id="receive_updates"
                                               name="receive_updates"
                                               v-model="form.receive_updates"
                                               :errors="form.errors.get('receive_updates')"
                                               @event="form.listen($event)"
                                ></vuex-checkbox>

                                <vuex-checkbox label="I agree the Terms & Conditions"
                                               id="terms_and_conditions"
                                               name="terms_and_conditions"
                                               v-model="form.terms_and_conditions"
                                               :errors="form.errors.get('terms_and_conditions')"
                                               @event="form.listen($event)"
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