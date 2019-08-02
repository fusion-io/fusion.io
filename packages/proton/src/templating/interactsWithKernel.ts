import { tokamak } from "@fusion.io/core";
import { Context } from "koa";
import Kernel from "../http/Koa";

/**
 * Kernel special interactions
 *
 * @param view
 */
export default (view: any) => {

    const kernel = tokamak.make<Kernel>(Kernel);

    /**
     * Adding render method for the context
     *
     */
    kernel.use(async (context:Context, next: Function) => {

        /**
         * Adding global context so the user can access it easier
         */
        view.addGlobal('context', context);

        /**
         * Inform the view environment that it should perform rendering
         *
         * @param template
         * @param data
         */
        context.render = (template: string, data: any) => {
            context.viewScope = { template, data };

            return context;
        };

        await next();

        if (context.viewScope) {

            const { template, data } = context.viewScope;

            /**
             * Perform rendering process.
             */
            context.body = await new Promise((resolve, reject) => {
                // We'll combine both data and context to the view.
                view.render(template, data, (error: Error, result: any) => {
                    if (error) return reject(error);

                    return resolve(result);
                });
            });

            context.html = true;
        }
    });
};