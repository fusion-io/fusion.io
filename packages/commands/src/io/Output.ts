import { Manager, singleton } from "@fusion.io/core";

export type OutputHelper = {
    showing(verbosity: number, ...args: any[]): Promise<any>;
}

export const VERBOSITY_OPERATION : number = 0;
export const VERBOSITY_ERROR     : number = 1;
export const VERBOSITY_INFO      : number = 2;
export const VERBOSITY_DEBUG     : number = 3;

@singleton()
export default class Output extends Manager<OutputHelper> {

    private verbosity = VERBOSITY_OPERATION;

    setVerbosity(verbosity: number) {
        this.verbosity = verbosity;
        return this;
    }

    show(type: string, verbosity: number, ...messages: any[]) {
        return this.adapter(type).showing(verbosity, ...messages);
    }

    operate(type: string, ...messages: any[]) {
        return this.show(type, VERBOSITY_OPERATION, ...messages);
    }

    error(type: string, ...messages: any[]) {
        if (this.verbosity >= VERBOSITY_ERROR) {
            return this.show(type, VERBOSITY_ERROR, ...messages);
        }
    }

    info(type: string, ...messages: any[]) {
        if (this.verbosity >= VERBOSITY_INFO) {
            return this.show(type, VERBOSITY_INFO, ...messages);
        }
    }

    debug(type: string, ...messages: any[]) {
        if (this.verbosity >= VERBOSITY_DEBUG) {
            return this.show(type, VERBOSITY_DEBUG, ...messages);
        }
    }
}
