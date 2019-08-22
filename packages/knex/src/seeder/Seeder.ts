import { Input, Output } from "@fusion.io/commands";

type SeederConstructor = {
    new(...args: any[]): Seeder;
}

export default abstract class Seeder {

    constructor(protected input: Input, protected output: Output) { }

    abstract async run(...args: any[]): Promise<void>;

    async call(seeders: SeederConstructor[], concurrent: boolean = true) {
        await this.output.info('log', `> Calling [${seeders.map(s => s.name).join(', ')}]`);
        await this.output.info('tasks', seeders.map(SeederConstructor => ({
            title: SeederConstructor.name,
            task: () => new SeederConstructor(this.input, this.output).run()
        })), { concurrent })
    }
}
