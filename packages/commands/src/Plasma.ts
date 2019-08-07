import { Plasma as CorePlasma, inject } from "@fusion.io/core";
import Config  from "./config/Config";
import ConsoleKernel from "./ConsoleKernel";
import Input from "./io/Input";
import Output from "./io/Output";
import Inquiry from "./io/InputHelper/Inquiry";
import Log from "./io/OuputHelper/Log";
import MessageBox from "./io/OuputHelper/MessageBox";
import Spinner from "./io/OuputHelper/Spinner";
import ProgressBar from "./io/OuputHelper/ProgressBar";
import Tasks from "./io/OuputHelper/Tasks";
import Table from "./io/OuputHelper/Table";
import UI from "./io/OuputHelper/UI";

export default class Plasma extends CorePlasma {

    @inject(ConsoleKernel, Input, Output)
    compose(consoleKernel: ConsoleKernel, input: Input, output: Output) {

        consoleKernel
            .register(Config)
            .on('error', (error: {code?: number}) => {
                process.exit(error.code || -5);
            })
        ;

        // Input Helpers
        input.extends('inquiry', new Inquiry());

        // Output Helpers
        output.extends('log', new Log());
        output.extends('box', new MessageBox());
        output.extends('spinner', new Spinner());
        output.extends('progress', new ProgressBar());
        output.extends('tasks', new Tasks());
        output.extends('table', new Table());
        output.extends('ui', new UI());
    }
}
