<template>
    <div>
        <h2>Setup</h2>
        <p>
            Import the library and <kbd>use</kbd>
            it as a Vue plugin. This will install the <kbd>v-input-sync</kbd>
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
        <p>
            If you prefer <kbd>require</kbd> over <kbd>import</kbd> use the destructuring syntax:
        </p>
        <pre v-highlightjs><code
                class="javascript no-lang">const { VuexForms } = require("vuex-forms")</code></pre>
        <p>
            If you'd rather not install anything globally, you can import any necessary form components,
            and the <kbd>v-input-sync</kbd> directive only to where they will be used:
        </p>
        <pre v-highlightjs><code class="javascript no-lang">import VuexText from "vuex-forms/lib/components/VuexText.vue"
import InputSyncDirective from "vuex-forms/lib/InputSyncDirective.js"

var MyComponent = Vue.extend({
    directives: {
        'input-sync': InputSyncDirective
    }
    components: {
        'vuex-text': VuexText
    }
})
</code></pre>
        <p>
            For the browser-ready bundle users, access the <kbd>VuexForms</kbd>
            module using destructuring syntax and then <kbd>use</kbd> it with Vue to activate it.
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
</template>

<script>
    export default {
        name: 'Setup'
    }
</script>