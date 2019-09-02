import {RequestRule, singleton} from "@fusion.io/proton";
import {Context} from "koa";

@singleton()
export default class AjvValidator extends RequestRule {

    protected extract(context: Context): any {
        return context.query
    }

    protected rules() {
        return {
            'user': 'user-json'
        };
    }
}
