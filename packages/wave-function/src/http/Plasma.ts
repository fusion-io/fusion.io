import { inject, Plasma as CorePlasma, Kernel, Router, Validator } from "@fusion.io/proton";
import { Context } from "koa";
import Ajv from "ajv";

import HelloController from "./HelloController";

export default class Plasma extends CorePlasma {

    @inject(Validator)
    compose(validator: Validator) {

        validator.extends('json', async (value: any, context: any) => {

            const schema    = {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    age: {
                        type: 'integer'
                    }
                }
            };
            const validator = new Ajv().compile(schema);
            const result = validator(value);
            context.ajvErrors = validator.errors;
            return result;
            // return validator(value);
        })
    }

    @inject(Kernel, Router, Validator)
    boot(kernel: Kernel, router: Router, validator: Validator) {

        kernel.use(router.routes());
        kernel.use(router.allowedMethods());

        router.group(webRouter => {
            webRouter.use(require('koa-session')(kernel));
            webRouter.controller(HelloController)
        });

        router.group(apiRouter => {
            apiRouter.prefix('/api/v1');
            apiRouter.get('/metadata', (context: Context) => {
                context.body = { version: '1.0' }
            });
        })
    }
}
