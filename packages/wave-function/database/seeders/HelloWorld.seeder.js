import { Seeder } from "@fusion.io/integrations-knex/lib/index";

export default class HelloWorld extends Seeder {

    async run() {
        await new Promise(((resolve, reject) => setTimeout(() => resolve(), Math.random() * 9000)));
    }
}
