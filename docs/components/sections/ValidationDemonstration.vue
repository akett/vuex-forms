<template>
    <div>
        <div class="columns">
            <div class="column is-6">
                <vuex-checkbox label="Accept (toggle this on then off)"
                               name="accept"
                               v-input-sync:accept="form"></vuex-checkbox>
                <vuex-text type="date"
                           label="afterDate (from today)"
                           name="afterDate"
                           v-input-sync:afterDate="form"></vuex-text>
                <vuex-text type="date"
                           label="afterDateOrEqual (from today)"
                           name="afterDateOrEqual"
                           v-input-sync:afterDateOrEqual="form"></vuex-text>
                <vuex-text type="text"
                           label="alpha"
                           name="alpha"
                           v-input-sync:alpha="form"></vuex-text>
                <vuex-text type="text"
                           label="alphaDash"
                           name="alphaDash"
                           v-input-sync:alphaDash="form"></vuex-text>
                <vuex-text type="text"
                           label="alphaNum"
                           name="alphaNum"
                           v-input-sync:alphaNum="form"></vuex-text>
                <vuex-text type="text"
                           label="and (minLength(2), maxLength(4))"
                           name="and"
                           v-input-sync:and="form"></vuex-text>
                <vuex-text type="date"
                           label="beforeDate (from today)"
                           name="beforeDate"
                           v-input-sync:beforeDate="form"></vuex-text>
                <vuex-text type="date"
                           label="beforeDateOrEqual (from today)"
                           name="beforeDateOrEqual"
                           v-input-sync:beforeDateOrEqual="form"></vuex-text>
                <vuex-text type="text"
                           label="between"
                           name="between"
                           v-input-sync:between="form"></vuex-text>
                <vuex-text type="text"
                           label="betweenLength"
                           name="betweenLength"
                           v-input-sync:betweenLength="form"></vuex-text>
                <vuex-text type="text"
                           label="Comparative Target (use to test sameAs, differentFrom rules)"
                           name="comparativeTarget"
                           v-input-sync:comparativeTarget="form"></vuex-text>
                <vuex-text type="text"
                           label="differentFrom"
                           name="differentFrom"
                           v-input-sync:differentFrom="form"></vuex-text>
                <vuex-text type="text"
                           label="differentFromCased"
                           name="differentFromCased"
                           v-input-sync:differentFromCased="form"></vuex-text>
                <vuex-text type="text"
                           label="email"
                           name="email"
                           v-input-sync:email="form"></vuex-text>
            </div>
            <div class="column is-6">
                <vuex-select label="inArray [Ford, Nissan, Jeep]"
                             :options="[
                            {value: null, name: 'Select an option...'},
                            {value: 'Ford', name: 'Ford'},
                            {value: 'Jeep', name: 'Jeep'},
                            {value: 'Kia', name: 'Kia'},
                            {value: 'Toyota', name: 'Toyota'},
                            {value: 'Nissan', name: 'Nissan'}
                        ]"
                             name="inArray"
                             v-input-sync:inArray="form"
                ></vuex-select>
                <vuex-text type="text"
                           label="ipAddress"
                           name="ipAddress"
                           v-input-sync:ipAddress="form"></vuex-text>
                <vuex-text type="text"
                           label="ipv4"
                           name="ipv4"
                           v-input-sync:ipv4="form"></vuex-text>
                <vuex-text type="text"
                           label="ipv6"
                           name="ipv6"
                           v-input-sync:ipv6="form"></vuex-text>
                <vuex-text type="text"
                           label="maxLength (4)"
                           name="maxLength"
                           v-input-sync:maxLength="form"></vuex-text>
                <vuex-text type="text"
                           label="minLength (4)"
                           name="minLength"
                           v-input-sync:minLength="form"></vuex-text>
                <vuex-select label="notInArray [Ford, Nissan, Jeep]"
                             :options="[
                            {value: null, name: 'Select an option...'},
                            {value: 'Ford', name: 'Ford'},
                            {value: 'Jeep', name: 'Jeep'},
                            {value: 'Kia', name: 'Kia'},
                            {value: 'Toyota', name: 'Toyota'},
                            {value: 'Nissan', name: 'Nissan'}
                        ]"
                             name="notInArray"
                             v-input-sync:notInArray="form"
                ></vuex-select>
                <vuex-text type="text"
                           label="numeric"
                           name="numeric"
                           v-input-sync:numeric="form"></vuex-text>
                <vuex-text type="text"
                           label="or (betweenLength(2, 4), betweenLength(6, 8))"
                           name="or"
                           v-input-sync:or="form"></vuex-text>
                <vuex-text type="text"
                           label="required"
                           name="required"
                           v-input-sync:required="form"></vuex-text>
                <vuex-text type="text"
                           label="requiredIf"
                           name="requiredIf"
                           v-input-sync:requiredIf="form"></vuex-text>
                <vuex-text type="text"
                           label="requiredUnless"
                           name="requiredUnless"
                           v-input-sync:requiredUnless="form"></vuex-text>
                <vuex-text type="text"
                           label="sameAs"
                           name="sameAs"
                           v-input-sync:sameAs="form"></vuex-text>
                <vuex-text type="text"
                           label="url"
                           name="urlTest"
                           v-input-sync:urlTest="form"></vuex-text>
            </div>
        </div>
        <div class="has-text-centered">
            <button type="button" class="button" @click="form.submit()">Submit</button>
        </div>
    </div>
</template>

<script>
    import {Form} from "../../../src"
    import {
        accepted,
        afterDate,
        afterDateOrEqual,
        alpha,
        alphaDash,
        alphaNum,
        and,
        beforeDate,
        beforeDateOrEqual,
        between,
        betweenLength,
        differentFrom,
        differentFromCased,
        email,
        inArray,
        ipAddress,
        ipv4,
        ipv6,
        maxLength,
        minLength,
        notInArray,
        numeric,
        or,
        required,
        requiredIf,
        requiredUnless,
        sameAs,
        url
    } from "../../../src/validators"
    export default {
        name: 'ValidationDemonstration',
        data() {
            return {
                form: new Form(this, {
                    accept: null,
                    afterDate: null,
                    afterDateOrEqual: null,
                    alpha: null,
                    alphaDash: null,
                    alphaNum: null,
                    and: null,
                    beforeDate: null,
                    beforeDateOrEqual: null,
                    between: null,
                    betweenLength: null,
                    comparativeTarget: 'match me',
                    differentFrom: null,
                    differentFromCased: null,
                    email: null,
                    inArray: null,
                    ipAddress: null,
                    ipv4: null,
                    ipv6: null,
                    maxLength: null,
                    minLength: null,
                    notInArray: null,
                    numeric: null,
                    or: null,
                    required: null,
                    requiredIf: null,
                    requiredUnless: null,
                    sameAs: null,
                    urlTest: null,
                }, {
                    validations: (validator) => ({
                        accept: {accepted},
                        afterDate: {afterDate: afterDate(new Date())},
                        afterDateOrEqual: {afterDateOrEqual: afterDateOrEqual(new Date())},
                        alpha: {alpha},
                        alphaDash: {alphaDash},
                        alphaNum: {alphaNum},
                        and: {and: and(minLength(2), maxLength(4))},
                        beforeDate: {beforeDate: beforeDate(new Date())},
                        beforeDateOrEqual: {beforeDateOrEqual: beforeDateOrEqual(new Date())},
                        between: {between: between(5, 10)},
                        betweenLength: {betweenLength: betweenLength(5, 10)},
                        differentFrom: {differentFrom: differentFrom('comparativeTarget')},
                        differentFromCased: {differentFromCased: differentFromCased('comparativeTarget')},
                        email: {email},
                        inArray: {inArray: inArray(['Ford', 'Nissan', 'Jeep'])},
                        ipAddress: {ipAddress},
                        ipv4: {ipv4},
                        ipv6: {ipv6},
                        maxLength: {maxLength: maxLength(4)},
                        minLength: {minLength: minLength(4)},
                        notInArray: {notInArray: notInArray(['Ford', 'Nissan', 'Jeep'])},
                        numeric: {numeric},
                        or: {or: or(betweenLength(2, 4), betweenLength(6, 8))},
                        required: {required},
                        requiredIf: {requiredIf: requiredIf(validator.required !== null)},
                        requiredUnless: {requiredUnless: requiredUnless(minLength(4))},
                        sameAs: {sameAs: sameAs('comparativeTarget')},
                        urlTest: {url},
                    }),
                    overrideMessages: {
                        and: {
                            and: 'This field has a minimum length of 2 and is required'
                        },
                        or: {
                            or: 'This field must be between 2 and 4 or 6 and 8 characters in length'
                        }
                    }
                }),
            }
        }
    }
</script>