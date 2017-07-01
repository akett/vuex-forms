<template>
    <div>
        <h2>Basic Usage 2: The Electric Boogaloo</h2>
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
</template>