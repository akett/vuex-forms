import {simpleRequest, routes} from "./index";

export function validateFormTest (formData) {
    return simpleRequest(routes.formTest, formData, 'post');
}