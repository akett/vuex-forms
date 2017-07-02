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

        <div @click="showMobileNav = false">
            <app-header></app-header>
        </div>

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
                        <li :class="{'is-active': activeTrigger === 'configuration' }">
                            <a href="#configuration">Configuration</a>
                        </li>
                    </ul>

                    <a href="#validation" class="nav-title">Validation</a>
                    <ul class="nav-list">
                        <li :class="{'is-active': activeTrigger === 'available-rules' }">
                            <a href="#available-rules">Available Rules</a>
                        </li>
                        <li :class="{'is-active': activeTrigger === 'full-demonstration' }">
                            <a href="#full-demonstration">Full Demonstration</a>
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

            <div class="content-area" @click="showMobileNav = false">

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
                <h1>Form Class</h1>
                <section class="doc-section">
                    <p>
                        This section is a work in progress. Coming soon is an overview of the available methods on the
                        <kbd>Form</kbd> class and its' subclass <kbd>Errors</kbd> (for working with validation messages
                        manually).
                    </p>

                    <div class="doc-example">
                        <a class="anchor" name="configuration"></a>
                        <h2>Configuration Options</h2>
                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Option</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>vuexAction</kbd></td>
                                    <td>false</td>
                                    <td>The Vuex action used in the <kbd>submit</kbd> method</td>
                                </tr>
                                <tr>
                                    <td><kbd>ajaxURL</kbd></td>
                                    <td>false</td>
                                    <td><em>non-functional</em></td>
                                </tr>
                                <tr>
                                    <td><kbd>ajaxMethod</kbd></td>
                                    <td>POST</td>
                                    <td><em>non-functional</em></td>
                                </tr>
                                <tr>
                                    <td><kbd>ajaxTimeout</kbd></td>
                                    <td>10000</td>
                                    <td><em>non-functional</em></td>
                                </tr>
                                <tr>
                                    <td><kbd>validations</kbd></td>
                                    <td>null</td>
                                    <td>An object containing the validations for your form (see the examples)</td>
                                </tr>
                                <tr>
                                    <td><kbd>defaultMessages</kbd></td>
                                    <td>validationMessages</td>
                                    <td>
                                        Pass an object keyed by the validation rules' names to replace the default
                                        messages with your own
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>overrideMessages</kbd></td>
                                    <td>{}</td>
                                    <td>
                                        Pass an object keyed by your form field names, then key the specific validation
                                        rules to override messages for individual fields
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>validateOnInput</kbd></td>
                                    <td>true</td>
                                    <td>Trigger validation for a field on an input event</td>
                                </tr>
                                <tr>
                                    <td><kbd>validateOnBlur</kbd></td>
                                    <td>true</td>
                                    <td>Trigger validation for a field on a blur event</td>
                                </tr>
                                <tr>
                                    <td><kbd>validateOnFocus</kbd></td>
                                    <td>false</td>
                                    <td>Trigger validation for a field on a focus event</td>
                                </tr>
                                <tr>
                                    <td><kbd>validateOnLoad</kbd></td>
                                    <td>false</td>
                                    <td>Trigger validation for all fields when the form is first created</td>
                                </tr>
                                <tr>
                                    <td><kbd>validateOnSubmit</kbd></td>
                                    <td>true</td>
                                    <td>Trigger validation for all fields on a submit event</td>
                                </tr>
                                <tr>
                                    <td><kbd>touchOnBlur</kbd></td>
                                    <td>false</td>
                                    <td>Make a field dirty on a blur event</td>
                                </tr>
                                <tr>
                                    <td><kbd>touchOnFocus</kbd></td>
                                    <td>false</td>
                                    <td>Make a field dirty on a focus event</td>
                                </tr>
                                <tr>
                                    <td><kbd>inputDebounce</kbd></td>
                                    <td>200</td>
                                    <td>How long to wait before validating after an input event</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>


                <a class="anchor" name="validation"></a>
                <h1>Validation</h1>
                <section class="doc-section">
                    <p>
                        This section is a work in progress. Coming soon is an explanation of how the validation message
                        system works.
                    </p>
                    <p>
                        For an in-depth explanation of how the validation rules work, see
                        <a href="https://monterail.github.io/vuelidate/">Vuelidate's documentations</a>.
                    </p>

                    <div class="doc-example">
                        <a class="anchor" name="available-rules"></a>
                        <h2>Available Rules</h2>
                        <p>
                            Here is a list of the validators provided exclusively by this package. For a list of the
                            validators already included with Vuelidate, check out
                            <a href="https://monterail.github.io/vuelidate/#sub-builtin-validators">their documentation</a>.
                            <br/>
                            <em>Note: all date validators use vanilla javascript</em>
                        </p>

                        <div class="table-scroller">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Parameters</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><kbd>accepted</kbd></td>
                                    <td><em>none</em></td>
                                    <td>
                                        Ideal for fields such as a terms & conditions or a privacy policy checkbox,
                                        informs the user they must accept the field.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>afterDate</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be after the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>afterDateOrEqual</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be after or equal to the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>alphaDash</kbd></td>
                                    <td><em>none</em></td>
                                    <td>
                                        Accepts only alphanumeric characters, along with - and _
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>beforeDate</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be before the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>beforeDateOrEqual</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be before or equal to the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>betweenLength</kbd></td>
                                    <td>min, max</td>
                                    <td>
                                        Requires that field is between MIN and MAX characters long
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>differentFrom</kbd></td>
                                    <td>min, max</td>
                                    <td>
                                        Checks for inequality with a given property, insensitive to casing. Behaves like <em>sameAs</em>
                                        from
                                        Vuelidate.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>differentFromCased</kbd></td>
                                    <td>min, max</td>
                                    <td>
                                        Checks for inequality with a given property, sensitive to casing.
                                        Behaves like <em>sameAs</em> from Vuelidate.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>afterDate</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be after the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>inArray</kbd></td>
                                    <td>array of values</td>
                                    <td>
                                        Requires that the input equals one of the values supplied in the array
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>afterDate</kbd></td>
                                    <td>date</td>
                                    <td>
                                        Requires a user selected date to be after the specified date.
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>ipAddress</kbd></td>
                                    <td><em>none</em></td>
                                    <td>
                                        Requires an input be a valid IPv4 or IPv6 address
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>ipv4</kbd></td>
                                    <td><em>none</em></td>
                                    <td>
                                        Requires an input be a valid IPv4 address
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>ipv6</kbd></td>
                                    <td><em>none</em></td>
                                    <td>
                                        Requires an input be a valid IPv6 address
                                    </td>
                                </tr>
                                <tr>
                                    <td><kbd>notInArray</kbd></td>
                                    <td>array of values</td>
                                    <td>
                                        Requires that the input does not equal one of the values supplied in the array
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="doc-example">
                        <a class="anchor" name="full-demonstration"></a>
                        <h2>Full Demonstration</h2>
                        <validation-demonstration></validation-demonstration>
                    </div>

                </section>


                <a class="anchor" name="form-components"></a>
                <h1>Form Components</h1>
                <section class="doc-section">
                    <p>
                        This section is a work in progress. An in-depth explanation on creating your own custom
                        components is coming soon! (for now you can try to figure it out using the provided mixins and
                        component templates)
                    </p>
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
