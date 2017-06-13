<template>
    <div>
        <h2>Nested Data</h2>
        <doc-example>
            <div slot="result" class="columns is-desktop">
                <div class="column is-6">
                    <form name="nested-form" @submit.prevent="form.submit()">

                        <vuex-text label="Name"
                                   name="name"
                                   v-model="form.name"
                                   :errors="form.errors.get('name')"
                                   @event="form.listen($event)"
                        ></vuex-text>

                        <vuex-text label="Nested Name"
                                   name="nested.data.is.nested.name"
                                   v-model="form.nested.data.is.nested.name"
                                   :errors="form.errors.get('nested.data.is.nested.name')"
                                   @event="form.listen($event)"
                        ></vuex-text>

                        <vuex-text label="Nested City"
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
            <div slot="html">
                <pre class="code" v-highlightjs><code class="html no-lang">&lt;form name="nested-form" @submit.prevent="form.submit()"&gt;

    &lt;vuex-text label="Name"
               name="name"
               v-model="form.name"
               :errors="form.errors.get('name')"
               @event="form.listen($event)"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text label="Nested Name"
               name="nested.data.is.nested.name"
               v-model="form.nested.data.is.nested.name"
               :errors="form.errors.get('nested.data.is.nested.name')"
               @event="form.listen($event)"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text label="Nested City"
               name="nested.data.is.nested.city"
               v-model="form.nested.data.is.nested.city"
               :errors="form.errors.get('nested.data.is.nested.city')"
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
import { required, minLength } from "vuex-forms/src/validators"

export default {
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
                validations: {
                    name: {required},
                    nested: {
                        data: {
                            is: {
                                nested: {
                                    name: {required, minLength: minLength(5)},
                                    city: {required},
                                }
                            }
                        }
                    }
                }
            })
        }
    }
}</code></pre>
            </div>
        </doc-example>
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
                    validations: {
                        name: {required},
                        nested: {
                            data: {
                                is: {
                                    nested: {
                                        name: {required, minLength: minLength(5)},
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