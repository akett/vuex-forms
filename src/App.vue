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
                        <span class="version">(ALPHA 0.0.1)</span>
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
                                <li>Built for Vuex - works without it</li>
                                <li>Model based forms & validation</li>
                                <li>Unobstructive presentation solution</li>
                                <li>Prebuilt components, easily restyled</li>
                                <li>Quick custom components from Mixins</li>
                                <li>Simple input masking</li>
                                <li>Configurable behavior</li>
                            </ul>
                        </div>
                        <div class="column is-6">
                            <ul class="feature-list">
                                <li>
                                    Validation powered by
                                    <a href="https://monterail.github.io/vuelidate/">Vuelidate</a>
                                </li>
                                <li>20+ <a href="https://laravel.com/">Laravel</a> inspired validation rules</li>
                                <li>Template-decoupled validation messages</li>
                                <li>Client-side validation message localization</li>
                                <li>Handles server-side validation messages</li>
                                <li>Custom validation rules & messages</li>
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
                <a href="#" class="nav-title">Getting Started</a>
                <ul class="nav-list">
                    <li>Introduction</li>
                    <li>Installation</li>
                    <li>Basic Usage</li>
                </ul>
            </div>
            <div class="content-area">
                <h1>Getting Started</h1>
                <h2>Basic Validation Example</h2>
                <form-example></form-example>
                <hr/>
                <h2>Dynamic Validation Example</h2>
                <form-example2></form-example2>
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

    $vue-light: #41b993;
    $vue-dark: #2c3e50;
    $saturated-vue-light: lighten(saturate($vue-light, 50), 35);
    $saturated-vue-dark: lighten(saturate($vue-dark, 25), 45);

    @keyframes fadeIn {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }

    .header {
        position: relative;
        &:before {
            content: ' ';
            display: block;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right bottom, $saturated-vue-light 0%, $saturated-vue-dark 100%);
            opacity: 0;
            animation: fadeIn 4s ease-out forwards;
        }
        color: #2c3e50;
        padding: 60px 1rem;
        text-align: center;
        font-size: 1.25rem;
        min-height: 100vh;
        a {
            color: saturate(darken($vue-light, 20), 50);
            &:hover {
                color: #FFF;
            }
        }
    }

    .header-centered {
        display: block;
        width: 100%;
        @media (min-width: 700px) and (min-height: 730px) {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
        }
    }

    .header-logo {
        margin-bottom: 4rem;
    }

    .logo {
        display: inline-block;
        vertical-align: middle;
        height: calc(8vw + 6vh);
        max-height: 120px;
    }

    .header-title {
        color: $vue-dark;
        display: inline-block;
        vertical-align: middle;
        font-weight: 700;
        font-size: calc(16px + 4vw + 3vh);
        font-variant: all-small-caps;
        margin: 0;
        .lighter {
            color: saturate(darken($vue-light, 15), 40);
        }
    }

    .version {
        display: block;
        text-align: right;
        font-size: 1rem;
        font-variant: normal;
    }

    .slogan {
        color: darken($vue-dark, 25);
        font-size: 1.1em;
    }

    .features {
        color: darken($vue-dark, 10);
        text-align: left;
        width: 100%;
        max-width: 800px;
        margin: 4rem auto;
        font-size: 0.82em;
    }

    .features-title {
        font-weight: 500;
    }

    .feature-list {
        margin: 0;
        padding: 0;
        & > li {
            display: block;
            margin: 0.5rem 1rem;
            & > ul {
                display: block;
                margin: 0.25rem 0 0 0.5rem;
                padding: 0;
                & > li {
                    display: block;
                    margin: 0.1rem 1rem;
                }
            }
        }
    }

    .docs {
        width: 100%;
        font-size: 0;
    }

    .navigation-pane {
        display: inline-block;
        vertical-align: top;
        width: 250px;
        height: 100vh;
        border-right: 1px solid #ccc;
        padding: 1rem;
        font-size: 1rem;
        @media (max-width: 768px) {
            display: none;
        }
    }

    .content-area {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 250px);
        padding: 2rem;
        font-size: 1rem;
    }

    .nav-title {
        font-size: 1.25em;
    }

    .nav-list {
        li {
            display: block;
        }
    }

    .api-reports {
        position: fixed;
        top: 0;
        right: 1rem;
    }

    .api-status {
        margin-top: 1rem;
        padding: 2rem;
        border-radius: 1rem;
        background: #41b883;
        color: #FFF;
    }

    .api-error {
        margin-top: 1rem;
        padding: 2rem;
        border-radius: 1rem;
        background: #b83146;
        color: #FFF;
    }
</style>
