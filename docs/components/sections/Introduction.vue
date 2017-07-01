<template>
    <div>
        <h2>Introduction</h2>
        <p>
            Tired of reinventing the wheel every time you need to validate forms on a new project?
            This package aims to provide a simple and uniform way to validate your forms and display
            validation messages, while only requiring a very minimal setup to do so.
            Powered by <a href="https://monterail.github.io/vuelidate/">Vuelidate's</a>
            robust validation system, this package simply adds on to that already
            incredible functionality by offering validation messages and input component syncing
            out-of-the-box.
        </p>
        <p>
            As hinted by the package name, you can stay worry-free about Vuex mutation errors or having
            to build your own custom components and logic to circumvent those errors
            (you can if you want, though!). Load your form
            data directly from your Vuex store (or any other source), and then at your discretion,
            submit or dispatch that data back to your data store using any logic you require.
        </p>
        <p>
            This package is designed to <em>only</em> handle your forms while attempting to make no assumptions about
            the rest of your architecture. Although methods for Vuex or Ajax submission are included, you
            can easily implement your own logic at any point you desire.
        </p>
        <p>
            And don't worry about server-side validation - by using Promises with your AJAX handler,
            you can inject your server-side validation messages into your form and have them displayed
            with little to no headache required. A section dedicated to explaining the process is coming
            soon!
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Introduction'
    }
</script>