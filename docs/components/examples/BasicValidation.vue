<template>
    <div>
        <h2>Basic Form with Validation</h2>
        <p>
            The same form as above, now with validations added per Vuelidate's specifications.
            Check the javascript tab to see how the validations were added, it's simple!
        </p>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">

                    <form name="example-form" @submit.prevent="form.submit()">

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

                        <vuex-text label="Zip Code"
                                   mask="#####-####"
                                   :save-mask="true"
                                   id="zip"
                                   name="zip"
                                   v-input-sync:zip="form"
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
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="basic-form+validation" @submit.prevent="form.submit()"&gt;

    &lt;vuex-text label="Name"
               id="name"
               name="name"
               v-input-sync:name="form"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text type="email"
               label="Email"
               id="email"
               name="email"
               v-input-sync:email="form"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text type="tel"
               mask="(###) ###-####"
               label="Phone"
               id="phone"
               name="phone"
               v-input-sync:phone="form"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text label="Zip Code"
               mask="#####-####"
               :save-mask="true"
               id="zip"
               name="zip"
               v-input-sync:zip="form"
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
    required,
    email,
    minLength,
    maxLength,
} from "vuex-forms/src/validators"

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
                    name: {required, minLength: minLength(2)},
                    email: {required, email},
                    phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
                    zip: {required, minLength: minLength(5), maxLength: maxLength(10)},
                },
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
        required,
        email,
        minLength,
        maxLength,
    } from "../../../src/validators"

    export default {
        name: 'BasicValidation',
        data () {
            return {
                form: new Form(this, {
                    name: null,
                    email: null,
                    phone: null,
                    zip: null,
                }, {
                    validations: {
                        name: {required, minLength: minLength(2)},
                        email: {required, email},
                        phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
                        zip: {required, minLength: minLength(5), maxLength: maxLength(10)},
                    },
                }),
            }
        }
    }
</script>