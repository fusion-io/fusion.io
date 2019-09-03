import RequestRule, { RequestRuleConstructor } from "./RequestRule";
import { tokamak } from "@fusion.io/core";
import { Context } from "koa";
import { Validator } from "@fusion.io/validation";

export default function (rules: RequestRuleConstructor) {
    return async (context: Context, next: Function) => {
        const ruler     = tokamak.make<RequestRule>(rules);
        const validator = tokamak.make<Validator>(Validator);
        await ruler.handle(context, next, validator);
    }
}
