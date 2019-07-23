import {router} from "@fusion.io/http";
import HelloWorldController from "./HelloWorldController";

export default {
    initial: () => {

    },

    bootstrap: () => {


        router.controller(HelloWorldController)
    }
}