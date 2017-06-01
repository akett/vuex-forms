import Vue from 'vue'
import Vuex from 'vuex'
import {
    SET_API_STATUS,
    SET_API_ERROR,
    SUBMIT_FORM
} from "./types"
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
            name: {required, minLength: minLength(2), alphaDash},
            email: {required, email},
            phone: {required, minLength: minLength(10), maxLength: maxLength(10)},
            city: {required, minLength: minLength(3)},
            state: {required},
            zip: {required, minLength: minLength(5), maxLength: maxLength(10), numeric},
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
        [SET_API_STATUS] (state, status) {
            state.API_STATUS = status
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
        [SUBMIT_FORM] ({commit, state, dispatch}, submittedFormData) {
            console.log(submittedFormData)
        }
    },
})

export default store