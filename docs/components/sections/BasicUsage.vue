<template>
    <div>
        <h2>Basic Usage</h2>
        <p>Let's start by creating a basic form with a single text field called <kbd>name</kbd>.</p>
        <p>
            First, we'll <kbd>import</kbd> and new up the <kbd>Form</kbd> class in our <kbd>data</kbd>
            property and define our form field:
        </p>
        <pre v-highlightjs><code class="javascript">import { Form } from "vuex-forms"
...
data() {
    return {
        form: new Form(this, { name: null })
    }
}
...</code></pre>
        <p>
            With that, the <kbd>Form</kbd> class has been instantiated on the
            <kbd>form</kbd> property with our form field <kbd>name</kbd>.
        </p>
        <p>
            Now, let's create the HTML to display our field. We'll use the <kbd>v-input-sync</kbd>
            directive to handle syncing the data between the form component and the form class, kind of like
            <kbd>v-model</kbd> would but with some extra logic throw in that will be covered later on:
        </p>
        <pre class="code" v-highlightjs><code class="html">&lt;vuex-text label="My name is:"
           name="name"
           v-input-sync:name="form"
&gt;&lt;/vuex-text&gt;</code></pre>
        <p>
            And we're done! Let's see what our result looks like:
        </p>
        <div class="columns">
            <div class="column is-6">
                <vuex-text label="My name is:"
                           name="name"
                           v-input-sync:name="form"></vuex-text>
            </div>
        </div>
        <p>
            Nothing special, huh? How about we add some validation to this, maybe require that the name
            is at least 3 characters long? It'll be easy!
        </p>
        <br/>
        <p>
            We'll do this by making a few changes to our javascript. We'll import the <kbd>minLength</kbd>
            validator and define a validations object in the third argument (the configuration object)
            of the <kbd>Form</kbd> class, containing the name of our form field and the validations we want it to have
            as an object. In this case, we only want the field to have a minimum length of 3:
        </p>
        <pre v-highlightjs><code class="javascript">import { Form } from "vuex-forms"
import { minLength } from "vuex-forms/lib/validators"
...
data() {
    return {
        form: new Form(this, { name: null }, {
            validations: {
                name: { minLength: minLength(3) }
            }
        })
    }
}
...</code></pre>
        <p>Now save and let's check out our result again, type in 2 characters and see what happens:</p>
        <div class="columns">
            <div class="column is-6">
                <vuex-text label="My name is:"
                           name="name"
                           v-input-sync:name="vForm"></vuex-text>
            </div>
        </div>
        <p>
            That wasn't too bad, was it? A few extra lines was all we needed to validate our field and display a
            validation message. From here I recommend that you check out the examples section to get a better
            understanding of what this package can do for you. For more information on validation, check out
            <a href="https://monterail.github.io/vuelidate/">Vuelidate's</a> examples.
        </p>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import {minLength} from "../../../src/validators"
    export default {
        name: 'BasicUsage',
        data() {
            return {
                form: new Form(this, {
                    name: null
                }),
                vForm: new Form(this, {
                    name: null
                }, {
                    validations: {
                        name: {minLength: minLength(3)}
                    }
                })
            }
        }
    }
</script>