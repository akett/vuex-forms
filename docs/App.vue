<template>
    <div id="app">
        <api-reporter></api-reporter>

        <app-header></app-header>

        <div class="docs" ref="docs">
            <div class="navigation-pane">
                <div :class="{ 'navigation-affix': true, 'affixed': affixed }">
                    <a href="#getting-started" class="nav-title">Getting Started</a>
                    <ul class="nav-list">
                        <li><a href="#introduction">Introduction</a></li>
                        <li><a href="#installation">Installation</a></li>
                        <li><a href="#basic-usage">Basic Usage</a></li>
                    </ul>

                    <a href="#examples" class="nav-title">Examples</a>
                    <ul class="nav-list">
                        <li><a href="#basic-validation-example">Basic Validation</a></li>
                        <li><a href="#dynamic-validation-example">Dynamic Validation</a></li>
                    </ul>

                    <a href="#validation" class="nav-title">Form Components</a>
                    <ul class="nav-list">
                        <li><a href="#basic-validation">vuex-text</a></li>
                        <li><a href="#dynamic-validation">vuex-select</a></li>
                        <li><a href="#dynamic-validation">vuex-checkbox</a></li>
                        <li><a href="#dynamic-validation">vuex-radio</a></li>
                    </ul>
                </div>
            </div>

            <div class="content-area">

                <a class="anchor" name="getting-started"></a>
                <h1>Getting Started</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="introduction"></a>
                        <h2>Introduction</h2>
                        <p>
                            Use this package to quickly create forms while keeping your components free from complex
                            form logic and form data that harms readability and maintenance tasks.
                        </p>
                        <p>
                            Stay DRY by loading data directly from your Vuex store or other sources, without worrying
                            about accidentally mutating that data until you're ready to dispatch it back into your store.
                        </p>
                        <p>
                            Easily validate your forms on the client-side and server-side. Any validation messages will be
                            read from the server response and mapped to the appropriate form fields.
                        </p>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="installation"></a>
                        <h2>Installation</h2>
                        <p>Install via npm or yarn</p>
                        <pre v-highlightjs>
<code class="shell no-lang">$ npm install vuex-forms --save</code>
<code class="shell no-lang">$ yarn install vuex-forms</code>
</pre>
                        <p>You can also download the package and use the browser-ready bundle directly</p>
                        <pre v-highlightjs>
<code class="html no-lang">&lt;script src="vuex-forms/dist/VuexForms.min.js"&gt;&lt;/script&gt;</code>
</pre>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="basic-usage"></a>
                        <h2>Basic Usage</h2>
                        <p>
                            You can import the library and <kbd>use</kbd>
                            it as a Vue plugin to install all the form components globally.
                        </p>
                        <pre v-highlightjs>
<code class="javascript">import Vue from "vue"
import VuexForms from "vuex-forms"
Vue.use(VuexForms)
</code>
</pre>
                        <p>
                            Alternatively, you can simply import the <kbd>Form</kbd>
                            class and any necessary form components directly to your components which will use them.
                        </p>
                        <pre v-highlightjs>
<code class="javascript">import { Form } from "vuex-forms"
import VuexText from "vuex-forms/src/components/VuexText.vue"

var Component = Vue.extend({
    components: {
        'vuex-text': VuexText
    },
    data() {
        return {
            form: new Form(this, {yourData}, {configOptions})
        }
    }
})
</code>
</pre>
                        <p>
                            If you're using the browser-ready bundle, simply include the script in your HTML and <kbd>use</kbd>
                            it with Vue to make the form components available to your page
                        </p>
                        <pre v-highlightjs>
<code class="html">&lt;script src="vue.js"&gt;&lt;/script&gt;
&lt;script src="vuex-forms/dist/VuexForms.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  var { VuexForms, Form } = window.VuexForms
  var { required } = window.validators

  Vue.use(VuexForms)

  var app = new Vue({
    el: '#app',
    data () {
      return {
        form: new Form(this, {yourData}, {configOptions}),
      }
    }
  })
&lt;/script&gt;
</code>
</pre>
                    </div>

                </section>

                <a class="anchor" name="examples"></a>
                <h1>Examples</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="basic-validation-example"></a>
                        <h2>Basic Validation</h2>
                        <basic-validation></basic-validation>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="dynamic-validation-example"></a>
                        <h2>Dynamic Validation</h2>
                        <dynamic-validation></dynamic-validation>
                        <pre v-highlightjs>
<code class="html">&lt;form name="example-form-2" @submit.prevent="form.submit()"&gt;
    &lt;vuex-text type="number"
               label="Minimum Name Length"
               id="nameLength"
               name="nameLength"
               v-model="form.nameLength"
               :errors="form.errors.get('nameLength')"
               @event="form.listen($event)"
    &gt;&lt;/vuex-text&gt;

    &lt;vuex-text label="Name"
               id="name"
               name="name"
               v-model.trim="form.name"
               :errors="form.errors.get('name')"
               @event="form.listen($event)"
    &gt;&lt;/vuex-text&gt;

    &lt;div class="has-text-centered"&gt;
        &lt;button type="submit" class="button"&gt;Submit&lt;/button&gt;
        &lt;button type="reset" class="button" @click="form.reset()"&gt;Reset&lt;/button&gt;
    &lt;/div&gt;
&lt;/form&gt;
</code>
</pre>
                        <pre v-highlightjs>
<code class="javascript">import { Form } from "vuex-forms"
import { required, minLength } from "vuex-forms/lib/validations"
export default {
  name: 'DynamicValidation',
  data () {
    return {
      form: new Form(this, {
        nameLength: 2,
        name: '',
      }, {
        vuexAction: 'SUBMIT_FORM',
        validations: (validator) => {
          return {
            nameLength: {required},
            name: {
              required,
              minLength: minLength(parseInt(validator.nameLength))
            }
          }
        }
      }),
    }
  }
}
</code>
</pre>
                    </div>

                </section>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: () => ({
            affixed: false,
        }),
        mounted() {
            window.addEventListener('scroll', this.handleScroll, false)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll, false)
        },
        methods: {
            handleScroll(e) {
                let bounds   = this.$refs.docs.getBoundingClientRect()
                this.affixed = bounds.top <= 0
            }
        }
    }
</script>

<style lang="scss">
    @import "./sass/main.scss";
</style>
