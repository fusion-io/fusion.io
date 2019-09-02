import { Context } from "koa";

import {
    RuleSetMapDefinition,
    Validator,
    RuleSetMapValidationResult
} from "@fusion.io/validation";

export type RequestRuleConstructor = {
    new(...args: any[]): RequestRule
}

export default abstract class RequestRule {

    protected abstract extract(context: Context): any;

    protected abstract rules(): RuleSetMapDefinition;

    async handle(context: Context, next: Function, validator: Validator) {
        const values  = this.extract(context);
        const rules   = validator.compileMap(this.rules());
        const result  = await rules.validate(values);

        if (this.passes(result)) {
            await this.whenPassed(result, context, next);
        } else {
            await this.whenFailed(result, context, next);
        }
    }

    protected passes(result: RuleSetMapValidationResult): boolean {
        return Object.values(result).reduce((shouldPasses: boolean, value) => {
            return value.valid && shouldPasses
        }, true);
    };

    protected async whenPassed(result: RuleSetMapValidationResult, context: Context, next: Function) {
        await next();
    }

    protected async whenFailed(result: RuleSetMapValidationResult, context: Context, next: Function) {
        context.status  = 422;
        context.body    = {
            message: 'Invalid request',
            reasons: Object.entries(result)
                .filter(([fieldName, fieldResult]) => !fieldResult.valid)
                .map(([fieldName, fieldResult]) => ({ fieldName, fieldResult }))
        }
    }
}
