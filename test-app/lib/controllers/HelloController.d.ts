import { Controller } from "@fusion.io/http";
import { Context } from "koa";
import { DatabaseManager } from "@fusion.io/database";
export default class HelloController extends Controller {
    private manager;
    constructor(manager: DatabaseManager);
    index(context: Context): Promise<void>;
}
