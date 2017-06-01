<template>
    <div class="form">
        <form name="example-form" @submit="submitForm">

            <div class="columns">
                <div class="column is-6">
                    <vuex-input type="text"
                                 label="Name"
                                 id="name"
                                 name="name"
                                 v-model="form.name"
                                 :errors="form.errors.get('name')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="email"
                                 label="Email"
                                 id="email"
                                 name="email"
                                 v-model="form.email"
                                 :errors="form.errors.get('email')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="tel"
                                 label="Phone (10 digits)"
                                 id="phone"
                                 name="phone"
                                 v-model="form.phone"
                                 mask="(###) ###-####"
                                 :errors="form.errors.get('phone')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="text"
                                 label="City"
                                 id="city"
                                 name="city"
                                 v-model="form.city"
                                 :errors="form.errors.get('city')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="select"
                                 label="State"
                                 id="state"
                                 name="state"
                                 :options="states"
                                 option_name="name"
                                 option_value="abbr"
                                 v-model="form.state"
                                 :errors="form.errors.get('state')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="text"
                                 label="Zip Code"
                                 id="zip"
                                 name="zip"
                                 v-model="form.zip"
                                 :errors="form.errors.get('zip')"
                                 mask="#####-####"
                                 :save-mask="true"
                                 @event="form.listen($event)"
                    ></vuex-input>
                </div>
                <div class="column is-6">

                    <vuex-input type="text"
                                 label="Favorite Website"
                                 id="website"
                                 name="website"
                                 placeholder="http://"
                                 v-model="form.website"
                                 :errors="form.errors.get('website')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="password"
                                 label="Password"
                                 id="password"
                                 name="password"
                                 v-model="form.password"
                                 :errors="form.errors.get('password')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="password"
                                 label="Confirm Password"
                                 id="password_confirmation"
                                 name="password_confirmation"
                                 v-model="form.password_confirmation"
                                 :errors="form.errors.get('password_confirmation')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="radio"
                                 label="Shipping Method"
                                 name="shipping_method"
                                 :options="shipping_options"
                                 option_name="name"
                                 option_value="value"
                                 v-model="form.shipping_method"
                                 :errors="form.errors.get('shipping_method')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="checkbox"
                                 label="Receive Updates"
                                 id="receive_updates"
                                 name="receive_updates"
                                 v-model="form.receive_updates"
                                 :errors="form.errors.get('receive_updates')"
                                 @event="form.listen($event)"
                    ></vuex-input>

                    <vuex-input type="checkbox"
                                 label="I agree the Terms & Conditions"
                                 id="terms_and_conditions"
                                 name="terms_and_conditions"
                                 v-model="form.terms_and_conditions"
                                 :errors="form.errors.get('terms_and_conditions')"
                                 @event="form.listen($event)"
                    ></vuex-input>
                </div>
            </div>

            <div class="has-text-centered">
                <button type="submit" class="button" @click="submitForm()">Submit</button>
                <button type="button" class="button" @click="form.reset()">Reset</button>
            </div>
        </form>
        <fieldset class="form-options">
            <legend>Form Options</legend>
            <div class="form-group">
                <label for="validateOnInput">
                    <input type="checkbox" id="validateOnInput" v-model="form.options.validateOnInput">
                    Validate on Input event
                </label>
            </div>
            <div class="form-group">
                <label for="validateOnBlur">
                    <input type="checkbox" id="validateOnBlur" v-model="form.options.validateOnBlur">
                    Validate on Blur event
                </label>
            </div>
            <div class="form-group">
                <label for="validateOnSubmit">
                    <input type="checkbox" id="validateOnSubmit" v-model="form.options.validateOnSubmit">
                    Validate on Submit
                </label>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import Form from "../../lib/Form"
    import states from "../store/static/us-states";
    export default {
        name: 'FormExample',
        data () {
            return {
                form: new Form(this, 'SUBMIT_FORM', this.$store.state.formTest, this.$store.state.formTestRules),
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