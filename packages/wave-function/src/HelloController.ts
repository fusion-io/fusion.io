import {Controller, get, singleton} from "@fusion.io/proton";
import {Context} from "koa";
import {Hub} from "@fusion.io/bus";
import FoobarMessage from "./FoobarMessage";
import {DatabaseManager} from "@fusion.io/integrations-knex";


@singleton(Hub, DatabaseManager)
export default class HelloController extends Controller {

    constructor(private hub: Hub, private dbm: DatabaseManager) {
        super();
    }

    @get('/message/hello')
    async index(context: Context) {


        await this.hub.dispatch(new FoobarMessage('hello world'));
        const connection = this.dbm.connection();
        const query = connection.select(connection.raw('1 + 1 as result')).first();

        context.body = await query;
    }
}
