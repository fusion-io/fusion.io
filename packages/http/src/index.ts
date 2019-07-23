import Controller from "./Controller";
import Router from "./Router";
import {
    route
} from "./decorators";

export const router = new Router();

export {
    Controller,
    Router,
    route
}


export default {
    initial: () => {

    },

    bootstrap: () => {

    }
}