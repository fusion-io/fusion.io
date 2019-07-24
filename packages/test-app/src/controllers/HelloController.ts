import {singleton} from "@fusion.io/core";
import {Controller, get} from "@fusion.io/http";
import {Context} from "koa";
import {DatabaseManager} from "@fusion.io/database";

@singleton(DatabaseManager)
export default class HelloController extends Controller {

    constructor(private manager: DatabaseManager) {
        super();
    }

    @get('/')
    async index(context: Context) {
        console.log(this.manager.connection());
        // const users = await this.manager.connection()
        //     .select()
        //     .from('users')
        // ;

        context.body = {
            users: 'xxxs'
        }
    }
}
