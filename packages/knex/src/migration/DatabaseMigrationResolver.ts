import { MigrationResolver } from "@fusion.io/migration";
import fs from "fs";

const camelCase  = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');

export default class DatabaseMigrationResolver implements MigrationResolver {

    async generateSource(comment: string) {
        const template = fs.readFileSync(`${__dirname}/../../resources/Migration.js.template`).toString();

        return template.replace(/:className:/g, upperFirst(camelCase(comment)));
    }

    async resolve(file: string) {
        const MigrationConstructor = require(file).default;

        return new MigrationConstructor();
    }
}
