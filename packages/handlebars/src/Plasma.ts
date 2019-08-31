import { inject, Plasma as CorePlasma } from "@fusion.io/core";
import Environment from "./Environment";
import Handlebars from "handlebars";
import glob from "glob";
import path from "path";
import fs from "fs";

export default class Plasma extends CorePlasma {

    @inject(Environment)
    compose(env: Environment) {
        const { directory } = this.config.view;

        Handlebars.registerHelper(require('handlebars-helpers')());

        glob.sync(directory + '/**/*.hbs').forEach(template => {
            const partial = path
                .relative(directory, template)
                .replace(/^\//, '')
                .replace('.hbs', '')
            ;

            Handlebars.registerPartial(partial, fs.readFileSync(template).toString());
        });

        env.setViewDirectory(directory);
    }
}
