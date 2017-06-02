<template>
    <div id="app">
        <div class="api-reports" v-if="apiBusy || apiError">
            <div class="api-error" v-if="apiError">
                <h2>API Error</h2>
                <p>
                    <strong>{{ apiError.status }} {{ apiError.message }}</strong>
                </p>
                <div class="has-text-centered">
                    <button type="button" class="button" @click="clearAPI()">Okay</button>
                </div>
            </div>
            <div class="api-status" v-if="apiBusy">
                <strong>API working...</strong>
            </div>
        </div>
        <div class="header">
            <div class="header-centered">
                <div class="header-logo">
                    <img src="./assets/logo.png" class="logo">
                    <h1 class="header-title">
                        Vuex<span class="lighter">Forms</span>
                        <span class="version">v0.0.1 (alpha)</span>
                    </h1>
                </div>
                <p class="slogan">
                    A comprehensive form management solution for
                    <a href="https://vuejs.org/">Vue.js</a>, built with
                    <a href="https://vuex.vuejs.org/">Vuex</a> in mind.
                </p>
                <div class="features">
                    <div class="columns">
                        <div class="column is-6">
                            <ul class="feature-list">
                                <li>Model based forms & validations</li>
                                <li>Dispatches a Vuex action on submit</li>
                                <li>Configurable for AJAX instead of Vuex</li>
                                <li>Loosely-coupled form components</li>
                                <li>Minimal logic in components</li>
                                <li>Mixins for quick custom components</li>
                                <li>Easy to use input masking</li>
                            </ul>
                        </div>
                        <div class="column is-6">
                            <ul class="feature-list">
                                <li>Robust validation, powered by <a href="https://monterail.github.io/vuelidate/">Vuelidate</a>
                                </li>
                                <li>20+ <a href="https://laravel.com/">Laravel</a> inspired validation rules</li>
                                <li>Template-decoupled validation messages</li>
                                <li>Custom validation rules & messages</li>
                                <li>Localization for messages</li>
                                <li>Configurable behavior</li>
                                <li>
                                    Minimal dependencies
                                    <br/>
                                    <small>
                                        (<a href="https://monterail.github.io/vuelidate/">Vuelidate</a>,
                                        optionally <a href="https://vuex.vuejs.org/">Vuex</a>)
                                    </small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="docs">
            <div class="navigation-pane">
                <a href="#getting-started" class="nav-title">Getting Started</a>
                <ul class="nav-list">
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#installation">Installation</a></li>
                    <li><a href="#basic-usage">Basic Usage</a></li>
                </ul>
                <a href="#validation" class="nav-title">Validation</a>
                <ul class="nav-list">
                    <li><a href="#basic-validations">Basic Validations</a></li>
                    <li><a href="#dynamic-validations">Dynamic Validations</a></li>
                </ul>
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
                        <a class="anchor" name="basic-validations"></a>
                        <h2>Basic Validation</h2>
                        <form-example></form-example>
                    </div>
                    <div class="doc-example">
                        <a class="anchor" name="dynamic-validations"></a>
                        <h2>Dynamic Validation</h2>
                        <form-example2></form-example2>
                    </div>
                </section>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {SET_API_IDLE, SET_API_ERROR} from "./store/types"
    export default {
        name: 'app',
        computed: mapGetters(['apiBusy', 'apiError']),
        methods: {
            clearAPI() {
                this.$store.commit(SET_API_IDLE)
                this.$store.commit(SET_API_ERROR)
            }
        }
    }
</script>

<style lang="scss">
    @import "./sass/main.scss";
</style>
