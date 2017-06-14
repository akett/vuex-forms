<template>
    <div id="app">
        <api-reporter></api-reporter>

        <div :class="{ 'navigation-header': true, 'affixed': affixed }">
            <label for="nav-toggle">
                <div class="hamburger">
                    <div class="lettuce"></div>
                    <div class="tomato"></div>
                    <div class="beef"></div>
                </div>
            </label>
            VuexForms
        </div>

        <app-header></app-header>

        <div class="docs" ref="docs">
            <input type="checkbox" id="nav-toggle" name="nav-toggle" class="nav-toggle" ref="nav_toggle">
            <div class="navigation-pane">
                <div :class="{ 'navigation-affix': true, 'affixed': affixed }">
                    <a href="#getting-started" class="nav-title">Getting Started</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'introduction' }">
                            <a href="#introduction">Introduction</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'installation' }">
                            <a href="#installation">Installation</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'basic-usage' }">
                            <a href="#basic-usage">Basic Usage</a>
                        </li>
                    </ul>

                    <a href="#examples" class="nav-title">Examples</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'basic-form' }">
                            <a href="#basic-form">Basic Form</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'basic-validation' }">
                            <a href="#basic-validation">Basic Validation</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'dynamic-validation' }">
                            <a href="#dynamic-validation">Dynamic Validation</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'nested-data' }">
                            <a href="#nested-data">Nested Data</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'complete-form' }">
                            <a href="#complete-form">Complete Form</a>
                        </li>
                    </ul>

                    <a href="#form-api" class="nav-title">Form API</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'usage' }">
                            <a href="#usage">Usage</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'configuration' }">
                            <a href="#configuration">Configuration</a>
                        </li>
                    </ul>

                    <a href="#validation" class="nav-title">Validation</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'available-rules' }">
                            <a href="#available-rules">Available Rules</a>
                        </li>
                    </ul>

                    <a href="#form-components" class="nav-title">Form Components</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'form-component-basics' }">
                            <a href="#form-component-basics">The Basics</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'vuex-text' }">
                            <a href="#vuex-text">vuex-text</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'vuex-select' }">
                            <a href="#vuex-select">vuex-select</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'vuex-checkbox' }">
                            <a href="#vuex-checkbox">vuex-checkbox</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'vuex-radio' }">
                            <a href="#vuex-radio">vuex-radio</a>
                        </li>
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
                            Easily validate your forms on the client and server side. For client-side, simply
                            pass a <kbd>validations</kbd> object in the <kbd>Form</kbd>'s config options.
                            Read the Vuelidate docs to learn more about the client validation system.
                            For server-side, read the section on server-side validating to learn what kind of
                            response VuexForms expects in order to properly map the validation messages
                            to the appropriate form fields.
                        </p>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="installation"></a>
                        <h2>Installation</h2>
                        <p>Install via npm or yarn</p>
                        <pre v-highlightjs><code class="shell no-lang">$ npm install vuex-forms --save</code>
<code class="shell no-lang">$ yarn add vuex-forms</code></pre>
                        <p>Or, use the browser-ready bundle</p>
                        <pre v-highlightjs><code class="html no-lang">&lt;script src="vuex-forms/dist/VuexForms.min.js"&gt;&lt;/script&gt;</code></pre>
                        <p>
                            Now that you have the package, import the library and <kbd>use</kbd>
                            it as a Vue plugin. This will install the <kbd>v-vuex-input</kbd>
                            directive and the prebuilt form components
                            (
                            <kbd>&lt;vuex-text&gt;</kbd>
                            <kbd>&lt;vuex-select&gt;</kbd>
                            <kbd>&lt;vuex-checkbox&gt;</kbd>
                            and
                            <kbd>&lt;vuex-radio&gt;</kbd>
                            )
                            globally.
                        </p>
                        <pre v-highlightjs><code class="javascript">import Vue from "vue"
import VuexForms from "vuex-forms"
Vue.use(VuexForms)
</code></pre>
                        <p>If you prefer <kbd>require</kbd> instead of <kbd>import</kbd>, use the destructuring syntax
                        </p>
                        <pre v-highlightjs><code
                                class="javascript no-lang">const { VuexForms } = require("vuex-forms")</code></pre>
                        <p>
                            If you'd rather not install it globally, you can import the <kbd>Form</kbd>
                            class and any necessary form components directly to where they will be used.
                        </p>
                        <pre v-highlightjs><code class="javascript no-lang">import { Form } from "vuex-forms"
import VuexText from "vuex-forms/src/components/VuexText.vue"

var MyComponent = Vue.extend({
    components: {
        'vuex-text': VuexText
    },
    data() {
        return {
            form: new Form(this, {yourData}, {configOptions})
        }
    }
})
</code></pre>
                        <p>
                            For browser-ready bundle users, access the <kbd>VuexForms</kbd>
                            module using destructuring syntax
                            and <kbd>use</kbd> it with Vue to activate it.
                        </p>
                        <pre v-highlightjs><code class="html">&lt;script src="vue.js"&gt;&lt;/script&gt;
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
</code></pre>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="basic-usage"></a>
                        <h2>Basic Usage</h2>
                        <p>
                            The functionality of this package revolves around the <kbd>Form</kbd>
                            class. It is responsible for handling your form data, communicating with the form
                            components, handling validation, and form submission. It accepts 3 arguments, the first
                            is the current component instance <kbd>this</kbd>, the second is an object containing
                            your desired form keys, and the third is a configuration object that allows you to configure
                            the behavior of your form.
                        </p>
                        <p>
                            To use it, you simply need to define a key on your components' <kbd>data()</kbd> object
                            which will receive an instance of <kbd>Form</kbd>.
                            Below, the key is aptly named <kbd>form</kbd>, but it can be whatever you want it to be
                        </p>
                        <pre v-highlightjs><code class="javascript">import { Form } from "vuex-forms"
...
data() {
    return {
        form: new Form(this, {yourFormKeys})
    }
}
...</code></pre>
                        <p>
                            Internally, the <kbd>Form</kbd> class clones and stores any form keys you pass to it.
                            This allows you to use an object from your Vuex store without worrying about mutation
                            errors. Of course, you can manually define the form keys if you aren't using Vuex.
                        </p>
                        <p>With Vuex:</p>
                        <pre v-highlightjs><code class="javascript no-lang">...
data() {
    return {
        form: new Form(this, this.$store.state.yourFormObject)
    }
}
...</code></pre>
                        <p>Without Vuex:</p>
                        <pre v-highlightjs><code class="javascript no-lang">...
data() {
    return {
        form: new Form(this, {
            name: null,
            city: null,
        })
    }
}
...</code></pre>
                        <p>
                            With your form keys now populating the <kbd>Form</kbd> class, the last thing you need to
                            worry about is how the form will be submitted, AJAX submission is currently non-functional,
                            so for now we will only focus on submission via Vuex.
                        </p>
                        <p>
                            The <kbd>Form</kbd> class expects that you have a Vuex action that will receive the
                            form keys as a single argument, and that's really it. Of course it's recommended to have
                            that action return a <kbd>Promise</kbd> that submits the form data via your own AJAX handler
                            to a server for validation, which then will <kbd>commit</kbd> a mutation to save the
                            now validated data back into your store, or <kbd>reject()</kbd> with the validation messages
                            should server validation fail, but all the <kbd>Form</kbd> class really cares about is that
                            there is a Vuex action it can submit to -
                            after that it's up to you how that data is processed.
                        </p>
                        <p>
                            If you choose to validate server-side, and would like those validation messages to be
                            displayed on your form, visit the <a href="#validation">Validation</a> section to learn how
                            to structure your Vuex actions to return the server validation messages to the
                            <kbd>Form</kbd> class.
                        </p>
                        <p>
                            Once you have a Vuex action set up to receive the form data, you simply need to pass
                            the name of that action in the <kbd>Form</kbd>'s configuration object
                        </p>
                        <pre v-highlightjs><code class="javascript no-lang">...
data() {
    return {
        form: new Form(this, {yourData}, {
            vuexAction: 'YOUR_VUEX_ACTION'
        })
    }
}
...</code></pre>
                        <p>
                            For those that don't want to use Vuex at all, have no fear, an AJAX only method is coming soon!
                        </p>
                    </div>

                </section>

                <a class="anchor" name="examples"></a>
                <h1>Examples</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="basic-form"></a>
                        <basic-form></basic-form>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="basic-validation"></a>
                        <basic-validation></basic-validation>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="dynamic-validation"></a>
                        <dynamic-validation></dynamic-validation>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="nested-data"></a>
                        <nested-example></nested-example>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="complete-form"></a>
                        <complete-form></complete-form>
                    </div>
                </section>


                <a class="anchor" name="form-api"></a>
                <h1>Form API</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="usage"></a>
                        <h2>Usage</h2>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="configuration"></a>
                        <h2>Configuration</h2>
                    </div>

                </section>


                <a class="anchor" name="validation"></a>
                <h1>Validation</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="available-rules"></a>
                        <h2>Available Rules</h2>
                    </div>

                </section>


                <a class="anchor" name="form-components"></a>
                <h1>Form Components</h1>
                <section class="doc-section">
                    <div class="doc-example">
                        <a class="anchor" name="form-component-basics"></a>
                        <h2>The Basics</h2>
                        <p>All form components accept the following props:</p>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Accepts Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>id</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>null</td>
                                </tr>
                                <tr>
                                    <td><kbd>name</kbd></td>
                                    <td>String</td>
                                    <td>yes</td>
                                    <td>(none)</td>
                                </tr>
                                <tr>
                                    <td><kbd>value</kbd></td>
                                    <td>Number, Boolean, String</td>
                                    <td>no</td>
                                    <td>null</td>
                                </tr>
                                <tr>
                                    <td><kbd>label</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>null</td>
                                </tr>
                                <tr>
                                    <td><kbd>placeholder</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>null</td>
                                </tr>
                                <tr>
                                    <td><kbd>required</kbd></td>
                                    <td>Boolean</td>
                                    <td>no</td>
                                    <td>false</td>
                                </tr>
                                <tr>
                                    <td><kbd>disabled</kbd></td>
                                    <td>Boolean</td>
                                    <td>no</td>
                                    <td>false</td>
                                </tr>
                                <tr>
                                    <td><kbd>errors</kbd></td>
                                    <td>String, Object, Array</td>
                                    <td>no</td>
                                    <td>null</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="vuex-text"></a>
                        <h2>vuex-text</h2>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Accepts Type</th>
                                    <th>Required</th>
                                    <th>Allowed Values</th>
                                    <th>Default</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>type</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>text, textarea, tel, number, email, password, url</td>
                                    <td>text</td>
                                </tr>
                                <tr>
                                    <td><kbd>mask</kbd></td>
                                    <td>String, Boolean</td>
                                    <td>no</td>
                                    <td></td>
                                    <td>false</td>
                                </tr>
                                <tr>
                                    <td><kbd>save-mask</kbd></td>
                                    <td>String, Boolean</td>
                                    <td>no</td>
                                    <td></td>
                                    <td>false</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="vuex-select"></a>
                        <h2>vuex-select</h2>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Accepts Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>options</kbd></td>
                                    <td>String, Object, Array</td>
                                    <td>no</td>
                                    <td>[ ]</td>
                                </tr>
                                <tr>
                                    <td><kbd>option_name</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>id</td>
                                </tr>
                                <tr>
                                    <td><kbd>option_value</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>id</td>
                                </tr>
                                <tr>
                                    <td><kbd>multiple</kbd></td>
                                    <td>boolean</td>
                                    <td>no</td>
                                    <td>false</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="vuex-checkbox"></a>
                        <h2>vuex-checkbox</h2>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Accepts Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>true-value</kbd></td>
                                    <td>Number, Boolean, String</td>
                                    <td>no</td>
                                    <td>true</td>
                                </tr>
                                <tr>
                                    <td><kbd>false-value</kbd></td>
                                    <td>Number, Boolean, String</td>
                                    <td>no</td>
                                    <td>false</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="vuex-radio"></a>
                        <h2>vuex-radio</h2>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Accepts Type</th>
                                    <th>Required</th>
                                    <th>Default</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>options</kbd></td>
                                    <td>String, Object, Array</td>
                                    <td>no</td>
                                    <td>[ ]</td>
                                </tr>
                                <tr>
                                    <td><kbd>option_name</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>id</td>
                                </tr>
                                <tr>
                                    <td><kbd>option_value</kbd></td>
                                    <td>String</td>
                                    <td>no</td>
                                    <td>id</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
            affixOffset: 0,
            triggers: [],
            activeTrigger: 'getting-started',
            scrollTolerance: 100,
            scrollTimeout: 50,
            scrollTimedOut: false,
        }),
        mounted() {
            this.triggers = this.$el.querySelectorAll('.anchor')
            setTimeout(() => {
                this.onScroll()
            }, 500)
            window.addEventListener('scroll', this.onScroll, {passive: true})
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.onScroll, {passive: true})
        },
        methods: {
            onScroll() {
                let scrollBounds = this.$refs.docs.getBoundingClientRect()
                this.affixed     = scrollBounds.top <= 0
                this.affixOffset = (scrollBounds.bottom < 360)
                    ? Math.abs(scrollBounds.bottom - 360)
                    : 0

                if (this.scrollTimedOut) return // waiting for setTimeout() to finish

                // collect dimension info on each section and put into dedicated array for easy access
                let tops = []
                Array.prototype.forEach.call(this.triggers, trigger => {
                    tops.push({
                        top: trigger.getBoundingClientRect().top,
                        name: trigger.getAttribute('name')
                    })
                })

                // if we're not scrolled past the page title, don't calculate the active section since it should just be the first section
                if (window.scrollY < scrollBounds.top) {
                    this.activeTrigger = tops[0].name
                    this.timeoutScroll()
                    return
                }

                // calculate which of the sections is currently in the viewport
                let activeTrigger = tops[0].name
                for (let i = 0; i < tops.length; i++) {
                    let trigger         = tops[i]
                    let previousTrigger = tops[i - 1]
                    let nextTrigger     = tops[i + 1]
                    if (nextTrigger && previousTrigger) {
                        if (trigger.top < this.scrollTolerance &&
                            nextTrigger.top > this.scrollTolerance &&
                            previousTrigger.top < trigger.top &&
                            nextTrigger.top > trigger.top) {
                            activeTrigger = trigger.name
                            break;
                        }
                    } else if (nextTrigger &&
                        trigger.top < this.scrollTolerance &&
                        nextTrigger.top > this.scrollTolerance &&
                        trigger.top < nextTrigger.top) {
                        activeTrigger = trigger.name
                        break
                    } else if (previousTrigger &&
                        trigger.top < this.scrollTolerance && trigger.top > previousTrigger.top) {
                        activeTrigger = trigger.name
                        break
                    }
                }

                this.activeTrigger = activeTrigger
                this.timeoutScroll()
            },
            timeoutScroll() {
                this.scrollTimedOut = true;
                setTimeout(function () {
                    this.scrollTimedOut = false
                }.bind(this), this.scrollTimeout)
            },
            scrollToTop() {
                this.$slots.content[0].elm.scrollIntoView();
            },
        }
    }
</script>

<style lang="scss">
    @import "./sass/main.scss";
</style>
