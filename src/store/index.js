import Vue from 'vue'
import Vuex from 'vuex'
import {SET_API_STATUS, SET_API_ERROR} from "./types"

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: false,
    modules: {},

    state: {
        API_STATUS: 'idle',
        API_ERROR: false,
        formTest: {
            field1: 'This is Field 1',
            field2: 'This is Field 2',
            field3: 'This is Field 3',
            field4: 'This is Field 4',
            field5: 'This is Field 5',
            field6: 'This is Field 6',
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
        }
    },

    actions: {},
})

export default store