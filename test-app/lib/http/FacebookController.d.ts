import { Controller } from "@fusion.io/http";
import { Context } from "koa";
import HelloWorldService from "./HelloWorldService";
export default class FacebookController extends Controller {
    handleFacebookUser(context: Context, next: Function, service: HelloWorldService): void;
}
