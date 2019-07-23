import Koa from "koa";
import {singleton} from "@fusion.io/core";

@singleton()
export default class Kernel extends Koa {

}
