import Axios from "axios";
import store from "../index";
import {
    SET_API_IDLE,
    SET_API_BUSY,
    SET_API_ERROR
} from "../types";

let axios = Axios.create({
    baseURL: '/api/',
    timeout: 12000
})

let requestDelayTimer   = 0;
let requestDelayTimeout = 500;

export const routes = {
    formTest: '/formTest',
}

export function simpleRequest(url, data = {}, method = 'post') {
    clearTimeout(requestDelayTimer)
    store.commit(SET_API_ERROR) // clear errors for new request
    store.commit(SET_API_BUSY) // set API_STATUS to busy
    return new Promise((resolve, reject) => {
        requestDelayTimer = setTimeout(() => {
            axios.request({url, method, data})
                .then(response => {
                    store.commit(SET_API_IDLE) // set API_STATUS to idle
                    resolve(response.data)
                })
                .catch(error => {
                    store.commit(SET_API_IDLE) // set API_STATUS to idle
                    let errorResponse = parseErrorResponse(error);
                    if (errorResponse !== false) {
                        store.commit(SET_API_ERROR, {
                            status: errorResponse.status,
                            message: errorResponse.statusText
                        })
                    } else {
                        store.commit(SET_API_ERROR, {status: 500, message: 'Unknown error'})
                    }

                    reject(errorResponse.data)
                })
        }, requestDelayTimeout)
        return requestDelayTimer
    })
}

function parseErrorResponse(error) {
    let errorResponse = (error.response) ? error.response : false;
    if (errorResponse === false && error.request) {
        errorResponse = (error.request) ? error.request : false;
    }
    return errorResponse
}
