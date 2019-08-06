import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import Config  from "./config/Config";
import ConsoleKernel from "./ConsoleKernel";
import Input from "./io/Input";
import Output from "./io/Output";
import Inquiry from "./io/InputHelper/Inquiry";
import Log from "./io/OuputHelper/Log";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel, Input, Output)
    compose(consoleKernel: ConsoleKernel, input: Input, output: Output) {

        consoleKernel
            .register(Config)
        ;

        input.extends('inquiry', new Inquiry());
        output.extends('log', new Log());
    }
}
