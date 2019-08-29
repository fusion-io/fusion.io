import { Command } from "@fusion.io/commands";
import { singleton } from "@fusion.io/proton";
import Plasma from "./Plasma";

@singleton()
export default class Neutron extends Command {

    describe = 'Neutron Source Code generator';

    subCommands = [Plasma];

    protected async execute() {

    }
}
