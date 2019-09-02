import { RequestRule, singleton } from "@fusion.io/proton";

@singleton()
export default class FoobarForm extends RequestRule {

    protected extract(context: any): any {
        return context.request.query;
    }

    protected rules() {
        return {
            foo: "int:min=10,max=20",
            bar: "equals:rikky"
        }
    }
}
