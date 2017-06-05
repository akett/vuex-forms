<template>
    <div>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">

                    <form name="example-form" @submit.prevent="submitForm">

                        <div class="columns">
                            <div class="column is-6">
                                <vuex-text label="Name"
                                           id="bu_name"
                                           name="name"
                                           v-model="form.name"
                                           :errors="form.errors.get('name')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="email"
                                           label="Email"
                                           id="bu_email"
                                           name="email"
                                           v-model="form.email"
                                           :errors="form.errors.get('email')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="tel"
                                           mask="(###) ###-####"
                                           label="Phone"
                                           id="bu_phone"
                                           name="phone"
                                           v-model="form.phone"
                                           :errors="form.errors.get('phone')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text label="City"
                                           id="bu_city"
                                           name="city"
                                           v-model="form.city"
                                           :errors="form.errors.get('city')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-select label="State"
                                             id="bu_state"
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
                                           id="bu_zip"
                                           name="zip"
                                           v-model="form.zip"
                                           :errors="form.errors.get('zip')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                            </div>
                            <div class="column is-6">

                                <vuex-text label="Favorite Website"
                                           placeholder="http://"
                                           id="bu_website"
                                           name="website"
                                           v-model="form.website"
                                           :errors="form.errors.get('website')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Password"
                                           id="bu_password"
                                           name="password"
                                           v-model="form.password"
                                           :errors="form.errors.get('password')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-text type="password"
                                           label="Confirm Password"
                                           id="bu_password_confirmation"
                                           name="password_confirmation"
                                           v-model="form.password_confirmation"
                                           :errors="form.errors.get('password_confirmation')"
                                           @event="form.listen($event)"
                                ></vuex-text>

                                <vuex-radio label="Shipping Method"
                                            id="bu_shipping_method"
                                            name="shipping_method"
                                            :options="shipping_options"
                                            option_name="name"
                                            option_value="value"
                                            v-model="form.shipping_method"
                                            :errors="form.errors.get('shipping_method')"
                                            @event="form.listen($event)"
                                ></vuex-radio>

                                <vuex-checkbox label="Receive Updates"
                                               id="bu_receive_updates"
                                               name="receive_updates"
                                               v-model="form.receive_updates"
                                               :errors="form.errors.get('receive_updates')"
                                               @event="form.listen($event)"
                                ></vuex-checkbox>

                                <vuex-checkbox label="I agree the Terms & Conditions"
                                               id="bu_terms_and_conditions"
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
            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="example-form" @submit.prevent="submitForm"&gt;

  &lt;div class="columns"&gt;
    &lt;div class="column is-6"&gt;

      &lt;vuex-text label="Name"
                 id="name"
                 name="name"
                 v-model="form.name"
                 :errors="form.errors.get('name')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-text type="email"
                 label="Email"
                 id="email"
                 name="email"
                 v-model="form.email"
                 :errors="form.errors.get('email')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-text type="tel"
                 mask="(###) ###-####"
                 label="Phone"
                 id="phone"
                 name="phone"
                 v-model="form.phone"
                 :errors="form.errors.get('phone')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-text label="City"
                 id="city"
                 name="city"
                 v-model="form.city"
                 :errors="form.errors.get('city')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-select label="State"
                   id="state"
                   name="state"
                   :options="states"
                   option_name="name"
                   option_value="abbr"
                   v-model="form.state"
                   :errors="form.errors.get('state')"
                   @event="form.listen($event)"
      &gt;&lt;/vuex-select&gt;

      &lt;vuex-text label="Zip Code"
                 mask="#####-####"
                 :save-mask="true"
                 id="zip"
                 name="zip"
                 v-model="form.zip"
                 :errors="form.errors.get('zip')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

    &lt;/div&gt;
    &lt;div class="column is-6"&gt;

      &lt;vuex-text label="Favorite Website"
                 placeholder="http://"
                 id="website"
                 name="website"
                 v-model="form.website"
                 :errors="form.errors.get('website')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-text type="password"
                 label="Password"
                 id="password"
                 name="password"
                 v-model="form.password"
                 :errors="form.errors.get('password')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-text type="password"
                 label="Confirm Password"
                 id="password_confirmation"
                 name="password_confirmation"
                 v-model="form.password_confirmation"
                 :errors="form.errors.get('password_confirmation')"
                 @event="form.listen($event)"
      &gt;&lt;/vuex-text&gt;

      &lt;vuex-radio label="Shipping Method"
                  id="shipping_method"
                  name="shipping_method"
                  :options="shipping_options"
                  option_name="name"
                  option_value="value"
                  v-model="form.shipping_method"
                  :errors="form.errors.get('shipping_method')"
                  @event="form.listen($event)"
      &gt;&lt;/vuex-radio&gt;

      &lt;vuex-checkbox label="Receive Updates"
                     id="receive_updates"
                     name="receive_updates"
                     v-model="form.receive_updates"
                     :errors="form.errors.get('receive_updates')"
                     @event="form.listen($event)"
      &gt;&lt;/vuex-checkbox&gt;

      &lt;vuex-checkbox label="I agree the Terms & Conditions"
                     id="terms_and_conditions"
                     name="terms_and_conditions"
                     v-model="form.terms_and_conditions"
                     :errors="form.errors.get('terms_and_conditions')"
                     @event="form.listen($event)"
      &gt;&lt;/vuex-checkbox&gt;

    &lt;/div&gt;
  &lt;/div&gt;

  &lt;div class="has-text-centered"&gt;
    &lt;button type="submit" class="button"&gt;Submit&lt;/button&gt;
    &lt;button type="reset" class="button" @click="form.reset()"&gt;Reset&lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
            </div>
            <div slot="javascript">
                <pre class="code" v-highlightjs><code class="javascript no-lang">import { Form } from "vuex-forms"
import {
  accepted,
  email,
  maxLength,
  minLength,
  required,
  requiredIf,
  requiredUnless,
  sameAs,
  url
} from "vuex-forms/src/validators"
import states from "../store/static/us-states";

export default {
  data () {
    return {
      form: new Form(this, {
        name: null,
        email: null,
        phone: null,
        city: null,
        state: null,
        zip: null,
        website: null,
        password: null,
        password_confirmation: null,
        shipping_method: null,
        receive_updates: null,
        terms_and_conditions: null
      }, {
        validations: {
          name: {required, minLength: minLength(2)},
          email: {required, email},
          phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
          city: {required, minLength: minLength(3)},
          state: {required},
          zip: {required, minLength: minLength(5), maxLength: maxLength(10)},
          website: {required, url},
          password: {required, minLength: minLength(4)},
          password_confirmation: {required, sameAs: sameAs('password')},
          shipping_method: {required},
          terms_and_conditions: {accepted},
        }
      }),
      states: states,
      shipping_options: [
        {name: 'Ground', value: 'Ground'},
        {name: '2 Day', value: '2 Day'},
        {name: 'Next Day', value: 'Next Day'},
      ],
    }
  }
}</code></pre>
            </div>
        </doc-example>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import states from "../../store/static/us-states";
    export default {
        name: 'BasicUsage',
        data () {
            return {
                form: new Form(this, this.$store.state.formTest, {
                    vuexAction: 'SUBMIT_FORM',
                    validations: this.$store.state.formTestRules
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
            submitForm() {
                this.form.submit()
                    .then()
                    .catch()
            }
        }
    }
</script>