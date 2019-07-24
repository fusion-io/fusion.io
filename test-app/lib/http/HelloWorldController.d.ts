import { Controller } from "@fusion.io/core";
import { Context } from "koa";
import HelloWorldService from "./HelloWorldService";
export default class HelloWorldController extends Controller {
    index(context: Context, next: Function, service: HelloWorldService): void;
}
