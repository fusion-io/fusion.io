export default class Foobar {

    async up(schema) {
        /**
         * @type SchemaBuilder
         */
        await schema.createTable('foobar', table => {
            table.increments();
            table.string('foo');
            table.string('bar');
            table.timestamps();
        })
    }

    async down(schema) {
        await schema.dropTable('foobar');
    }
}
