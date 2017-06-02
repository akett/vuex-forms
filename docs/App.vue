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

                    <a href="#validation" class="nav-title">Validation</a>
                    <ul class="nav-list">
                        <li><a href="#basic-validation">Basic Validation</a></li>
                        <li><a href="#dynamic-validation">Dynamic Validation</a></li>
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
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="installation"></a>
                        <h2>Installation</h2>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="basic-usage"></a>
                        <h2>Basic Usage</h2>
                    </div>

                </section>

                <a class="anchor" name="validation"></a>
                <h1>Validation</h1>
                <section class="doc-section">

                    <div class="doc-example">
                        <a class="anchor" name="basic-validation"></a>
                        <h2>Basic Validation</h2>
                        <basic-validation></basic-validation>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="dynamic-validation"></a>
                        <h2>Dynamic Validation</h2>
                        <dynamic-validation></dynamic-validation>
                    </div>

<pre v-highlightjs>
<code class="javascript">import { Form } from "vuex-forms"
import { required, minLength } from "vuex-forms/lib/validations/index"
export default {
  name: 'DynamicValidation',
  data: () => ({
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
  })
}
</code>
</pre>

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
