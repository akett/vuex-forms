<template>
    <div id="app">
        <api-reporter></api-reporter>

        <div :class="{ 'navigation-header': true, 'affixed': affixed }">
            <label @click="showMobileNav = !showMobileNav">
                <div class="hamburger">
                    <div class="lettuce"></div>
                    <div class="tomato"></div>
                    <div class="beef"></div>
                </div>
                VuexForms
            </label>
        </div>

        <app-header></app-header>

        <div class="docs" ref="docs">
            <div class="navigation-pane">
                <div :class="{ 'navigation-affix': true, 'affixed': affixed, 'mobile-nav': showMobileNav }">
                    <a href="#getting-started" class="nav-title">Getting Started</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'introduction' }">
                            <a href="#introduction">Introduction</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'installation' }">
                            <a href="#installation">Installation</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'webpack' }">
                            <a href="#webpack">Webpack</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'setup' }">
                            <a href="#setup">Setup</a>
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
                        <introduction></introduction>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="installation"></a>
                        <installation></installation>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="webpack"></a>
                        <webpack></webpack>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="setup"></a>
                        <setup></setup>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="basic-usage"></a>
                        <basic-usage></basic-usage>
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
            scrollTolerance: 300,
            scrollTimeout: 50,
            scrollTimedOut: false,
            showMobileNav: false,
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
