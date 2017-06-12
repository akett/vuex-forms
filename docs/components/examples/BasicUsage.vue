<template>
    <div>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">
                    <form name="example-form" @submit.prevent="submitForm">

                        <vuex-text label="Name (directive)"
                                   id="bu_name"
                                   name="name"
                                   v-vuex-input:name="form"
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

                        <vuex-text label="Zip Code"
                                   mask="#####-####"
                                   :save-mask="true"
                                   id="bu_zip"
                                   name="zip"
                                   v-model="form.zip"
                                   :errors="form.errors.get('zip')"
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
            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="example-form" @submit.prevent="form.submit()"&gt;

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

    &lt;vuex-text label="Zip Code"
               mask="#####-####"
               :save-mask="true"
               id="zip"
               name="zip"
               v-model="form.zip"
               :errors="form.errors.get('zip')"
               @event="form.listen($event)"
    &gt;&lt;/vuex-text&gt;

    &lt;div class="has-text-centered"&gt;
        &lt;button type="submit" class="button"&gt;Submit&lt;/button&gt;
        &lt;button type="reset" class="button" @click="form.reset()"&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
&lt;/form&gt;</code></pre>
            </div>
            <div slot="javascript">
                <pre class="code" v-highlightjs><code class="javascript no-lang">import { Form } from "vuex-forms"
import {
  email,
  maxLength,
  minLength,
  required,
} from "vuex-forms/src/validators"
import states from "../store/static/us-states";

export default {
    data () {
        return {
            form: new Form(this, {
                name: null,
                email: null,
                phone: null,
                zip: null,
            }, {
                validations: {
                    name: { required, minLength: minLength(2) },
                    email: { required, email },
                    phone: { required, minLength: minLength(10), maxLength: maxLength(10) },
                    zip: { required, minLength: minLength(5), maxLength: maxLength(10) },
                }
            }),
        }
    }
}</code></pre>
            </div>
        </doc-example>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import {
        email,
        maxLength,
        minLength,
        required,
    } from "../../../src/validators"
    export default {
        name: 'BasicUsage',
        data () {
            return {
                form: new Form(this, {
                    name: 'Name test',
                    email: null,
                    phone: null,
                    zip: null,
                }, {
                    validations: {
                        name: {required, minLength: minLength(2)},
                        email: {required, email},
                        phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
                        zip: {required, minLength: minLength(5), maxLength: maxLength(10)},
                    }
                }),
            }
        },
        methods: {
            submitForm() {
                this.form.submit()
                    .then(validated => {
                    })
                    .catch(errors => {
                    })
            }
        }
    }
</script>