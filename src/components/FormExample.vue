<template>
    <div class="form">
        <form name="example-form" @submit="submitForm">

            <div class="columns">
                <div class="column is-6">
                    <input-group type="text"
                                 label="Name"
                                 id="name"
                                 name="name"
                                 :required="true"
                                 v-model="form.name"
                                 :errors="form.errors.get('name')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="email"
                                 label="Email"
                                 id="email"
                                 name="email"
                                 :required="true"
                                 v-model="form.email"
                                 :errors="form.errors.get('email')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="tel"
                                 label="Phone (10 digits)"
                                 id="phone"
                                 name="phone"
                                 :required="true"
                                 v-model="form.phone"
                                 mask="(###) ###-####"
                                 :errors="form.errors.get('phone')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="text"
                                 label="City"
                                 id="city"
                                 name="city"
                                 :required="true"
                                 v-model="form.city"
                                 :errors="form.errors.get('city')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="select"
                                 label="State"
                                 id="state"
                                 name="state"
                                 :required="true"
                                 :options="states"
                                 option_name="name"
                                 option_value="abbr"
                                 v-model="form.state"
                                 :errors="form.errors.get('state')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="text"
                                 label="Zip Code"
                                 id="zip"
                                 name="zip"
                                 :required="true"
                                 v-model="form.zip"
                                 :errors="form.errors.get('zip')"
                                 mask="#####-####"
                                 :save-mask="true"
                                 @event="form.listen($event)"
                    ></input-group>
                </div>
                <div class="column is-6">

                    <input-group type="text"
                                 label="Favorite Website"
                                 id="website"
                                 name="website"
                                 :required="true"
                                 placeholder="http://"
                                 v-model="form.website"
                                 :errors="form.errors.get('website')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="password"
                                 label="Password"
                                 id="password"
                                 name="password"
                                 :required="true"
                                 v-model="form.password"
                                 :errors="form.errors.get('password')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="password"
                                 label="Confirm Password"
                                 id="password_confirmation"
                                 name="password_confirmation"
                                 :required="true"
                                 v-model="form.password_confirmation"
                                 :errors="form.errors.get('password_confirmation')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="radio"
                                 label="Shipping Method"
                                 name="shipping_method"
                                 :options="shipping_options"
                                 option_name="name"
                                 option_value="value"
                                 v-model="form.shipping_method"
                                 :errors="form.errors.get('shipping_method')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="checkbox"
                                 label="Receive Updates"
                                 id="receive_updates"
                                 name="receive_updates"
                                 v-model="form.receive_updates"
                                 :errors="form.errors.get('receive_updates')"
                                 @event="form.listen($event)"
                    ></input-group>

                    <input-group type="checkbox"
                                 label="I agree the Terms & Conditions"
                                 id="consent"
                                 name="consent"
                                 :required="true"
                                 v-model="form.consent"
                                 :errors="form.errors.get('consent')"
                                 @event="form.listen($event)"
                    ></input-group>
                </div>
            </div>

            <div class="has-text-centered">
                <button type="submit" class="button" @click="submitForm()">Submit</button>
                <button type="button" class="button" @click="form.reset()">Reset</button>
            </div>
        </form>
        <div class="form-options">
            <div class="form-group">
                <input type="checkbox" v-model="form.options.validateOnBlur">
                Validate on Blur event
            </div>
            <div class="form-group">
                <input type="checkbox" v-model="form.options.validateOnInput">
                Validate on Input event
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "../utils/Form"
    import states from "../utils/us-states";
    export default {
        name: 'FormExample',
        data () {
            return {
                form: new Form(this, 'SUBMIT_FORM', this.$store.state.formTest, this.$store.state.formTestRules, {
                    consent: {
                        required: 'You must consent to the terms.',
                    },
                }),
                states: states,
                shipping_options: [
                    {name: 'Ground', value: 'Ground'},
                    {name: '2 Day', value: '2 Day'},
                    {name: 'Next Day', value: 'Next Day'},
                ]
            }
        },
        methods: {
            submitForm(e) {
                if (e) e.preventDefault()

                this.form.submit().then(validatedData => {
                    console.log('success!')
                    console.log(validatedData)
                }).catch(errorData => {
                    console.log('error!')
                    console.log(errorData)
                })
            }
        }
    }
</script>