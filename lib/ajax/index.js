'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = undefined;
exports.simpleRequest = simpleRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = _axios2.default.create({
    baseURL: 'http://vuex-forms.local/api/',
    timeout: 12000
});

var requestDelayTimer = 0;
var requestDelayTimeout = 500;

var routes = exports.routes = {
    formTest: '/formTest'
};

function simpleRequest(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'post';

    clearTimeout(requestDelayTimer);
    store.commit(SET_API_ERROR);
    store.commit(SET_API_BUSY);
    return new Promise(function (resolve, reject) {
        requestDelayTimer = setTimeout(function () {
            axios.request({ url: url, method: method, data: data }).then(function (response) {
                store.commit(SET_API_IDLE);
                resolve(response.data);
            }).catch(function (error) {
                store.commit(SET_API_IDLE);
                var errorResponse = parseErrorResponse(error);
                if (errorResponse !== false) {
                    store.commit(SET_API_ERROR, {
                        status: errorResponse.status,
                        message: errorResponse.statusText
                    });
                } else {
                    store.commit(SET_API_ERROR, { status: 500, message: 'Unknown error' });
                }

                reject(errorResponse.data);
            });
        }, requestDelayTimeout);
        return requestDelayTimer;
    });
}

function parseErrorResponse(error) {
    var errorResponse = error.response ? error.response : false;
    if (errorResponse === false && error.request) {
        errorResponse = error.request ? error.request : false;
    }
    return errorResponse;
}