<template>
    <div>
        <h2>Basic Form</h2>
        <p>
            No validation, no Vuex, just a simple form with manually defined fields, input masking,
            and the default form components using the <kbd>v-input-sync</kbd> directive to pass form events
            and sync the form data. This example isn't setup to submit to anything, so pressing submit here
            effectively does nothing.
        </p>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">
                    <form name="example-form" @submit.prevent="form.submit()">

                        <vuex-text label="Name"
                                   id="bu_name"
                                   name="name"
                                   v-input-sync:name="form"
                        ></vuex-text>

                        <vuex-text type="email"
                                   label="Email"
                                   id="bu_email"
                                   name="email"
                                   v-input-sync:email="form"
                        ></vuex-text>

                        <vuex-text type="tel"
                                   mask="(###) ###-####"
                                   label="Phone"
                                   id="bu_phone"
                                   name="phone"
                                   v-input-sync:phone="form"
                        ></vuex-text>

                        <vuex-text label="Zip Code"
                                   mask="#####-####"
                                   :save-mask="true"
                                   id="bu_zip"
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
                </div>
            </div>
            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="basic-form" @submit.prevent="form.submit()"&gt;

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

export default {
    data () {
        return {
            form: new Form(this, {
                name: null,
                email: null,
                phone: null,
                zip: null,
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
    export default {
        name: 'BasicForm',
        data () {
            return {
                form: new Form(this, {
                    name: null,
                    email: null,
                    phone: null,
                    zip: null,
                }),
                hint: false,
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