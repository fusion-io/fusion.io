import {DatabaseManager, Seeder} from "@fusion.io/integrations-knex/lib/index";
import {inject} from "@fusion.io/proton/lib/index";
import HelloWorld from "./HelloWorld.seeder";

export default class Foobar extends Seeder {

    /**
     *
     * @param { DatabaseManager } dbm
     * @returns {Promise<void>}
     */
    @inject(DatabaseManager)
    async run(dbm) {
        await this.output.info('log','Running some database seeder');
        await this.call([
            HelloWorld,
            HelloWorld
        ]);
    }
}
