import { Manager, singleton } from "@fusion.io/core";

export type OutputHelper = {
    showing(...args: any[]): Promise<any>;
}

@singleton()
export default class Output extends Manager<OutputHelper> {

}
