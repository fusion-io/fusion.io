import { RequestRule, singleton } from "@fusion.io/proton";
import {Context} from "koa";

@singleton()
export default class FoobarForm extends RequestRule {

    protected extract(context: Context): any {
        return { query: context.query };
    }

    protected rules() {
        return {
            query: "system:foobar"
        };
    }

}
