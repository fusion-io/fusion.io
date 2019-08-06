import {inject, singleton} from "@fusion.io/core";
import Kernel from "../http/Koa";
import { Command } from "@fusion.io/commands";

@singleton()
export default class Serve extends Command {

    @inject(Kernel, 'config')
    protected execute(argv: any, kernel: Kernel, { http: port }: any) {
        kernel.listen(port);
    }
}
