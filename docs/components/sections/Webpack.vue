<template>
    <div>
        <h2>Webpack Configuration</h2>
        <p>
            This package makes use of HTML files for component templates. If you're using Webpack, you may need
            to add an additional loader for HTML files to your webpack configuration (if you haven't already),
            or Webpack will throw an error about not being able to parse .html files.
        </p>
        <p>
            I recommend using <a href="https://www.npmjs.com/package/html-loader">html-loader</a> for this task.
            Install it via npm or yarn:
        </p>
        <pre v-highlightjs><code class="shell no-lang">$ npm install html-loader --save-dev</code>
<code class="shell no-lang">$ yarn add html-loader --save</code></pre>
        <p>Then, add a new rule to your webpack configuration:</p>
        <pre v-highlightjs><code class="javascript">{
    ...
    module: {
        rules {
            ...
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            ...
        },
    }
    ...
}
</code></pre>
        <p>It should now work with your production build commands if it wasn't before.</p>
    </div>
</template>

<script>
    export default {
        name: 'Webpack'
    }
</script>