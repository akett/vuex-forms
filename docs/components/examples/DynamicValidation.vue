<template>
    <div>
        <h2>Dynamic Validation</h2>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">
                    <form name="dynamic-validation" @submit.prevent="form.submit()">

                        <vuex-text type="number"
                                   label="Minimum Name Length"
                                   id="nameLength"
                                   name="nameLength"
                                   v-vuex-input:nameLength="form"
                        ></vuex-text>

                        <vuex-text label="Name"
                                   id="name"
                                   name="name"
                                   v-vuex-input:name="form"
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
            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="dynamic-validation" @submit.prevent="form.submit()"&gt;

    &lt;vuex-text type="number"
               label="Minimum Name Length"
               id="nameLength"
               name="nameLength"
               v-vuex-input:nameLength="form"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text label="Name"
               id="name"
               name="name"
               v-vuex-input:name="form"
    &gt;&lt;/vuex-text&gt;

    &lt;div class="has-text-centered"&gt;
        &lt;button type="submit" class="button"&gt;Submit&lt;/button&gt;
        &lt;button type="reset" class="button" @click="form.reset()"&gt;Reset&lt;/button&gt;
    &lt;/div&gt;

&lt;/form&gt;</code></pre>
            </div>
            <div slot="javascript">
                <pre class="code" v-highlightjs><code class="javascript no-lang">import { Form } from "vuex-forms"
import { required, minLength } from "vuex-forms/src/validators"

export default {
    data () {
        return {
            form: new Form(this, {
                nameLength: 2,
                name: '',
            }, {
                validations: (validator) => ({
                    nameLength: {required},
                    name: {
                        required,
                        minLength: minLength(parseInt(validator.nameLength))
                    }
                })
            }),
        }
    }
}</code></pre>
            </div>
        </doc-example>
    </div>
</template>

<script>
    import Form from "../../../src/Form"
    import {required, minLength} from "../../../src/validators/index"

    export default {
        name: 'DynamicValidation',
        data () {
            return {
                form: new Form(this, {
                    nameLength: 2,
                    name: '',
                }, {
                    validations: (validator) => ({
                        nameLength: {required},
                        name: {
                            required,
                            minLength: minLength(parseInt(validator.nameLength))
                        }
                    })
                }),
            }
        }
    }
</script>