import Vue from 'vue'
import Vuex from 'vuex'
import {
    SET_API_IDLE,
    SET_API_BUSY,
    SET_API_ERROR,
    SUBMIT_FORM
} from "./types"

import {validateFormTest} from "./_api/test"

import {
    accepted,
    alpha,
    alphaNum,
    alphaDash,
    and,
    between,
    email,
    maxLength,
    minLength,
    numeric,
    or,
    required,
    requiredIf,
    requiredUnless,
    sameAs,
    url
} from "../../lib/validations"

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: false,
    modules: {},

    state: {
        API_STATUS: 'idle',
        API_ERROR: false,
        formTest: {
            name: null,
            email: null,
            phone: null,
            city: null,
            state: null,
            zip: null,
            website: null,
            password: null,
            password_confirmation: null,
            shipping_method: null,
            receive_updates: null,
            terms_and_conditions: null,
        },
        formTestRules: {
            name: {required, minLength: minLength(2)},
            email: {required, email},
            phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
            city: {required, minLength: minLength(3)},
            state: {required},
            zip: {required, minLength: minLength(5), maxLength: maxLength(10)},
            website: {required, url},
            password: {required, minLength: minLength(4)},
            password_confirmation: {required, sameAs: sameAs('password')},
            shipping_method: {required},
            terms_and_conditions: {accepted},
        }
    },

    getters: {
        apiBusy: state => state.API_STATUS === 'busy',
        apiError: state => state.API_ERROR,
    },

    mutations: {
        [SET_API_IDLE] (state) {
            state.API_STATUS = 'idle'
        },
        [SET_API_BUSY] (state) {
            state.API_STATUS = 'busy'
        },
        [SET_API_ERROR] (state, error) {
            state.API_ERROR = error
        },
        [SUBMIT_FORM] (state, formData) {
            for (let prop in state.formTest) {
                if (state.formTest.hasOwnProperty(prop) && formData.hasOwnProperty(prop)) {
                    state.formTest[prop] = formData[prop]
                }
            }
        }
    },

    actions: {
        [SUBMIT_FORM] ({dispatch, commit, state}, submittedFormData) {
            return new Promise((resolve, reject) => {
                validateFormTest(submittedFormData)
                    .then(data => {
                        commit(SUBMIT_FORM, data)
                        resolve(data)
                    })
                    .catch(errors => {
                        reject(errors)
                    })
            })
        }
    },
})

export default store