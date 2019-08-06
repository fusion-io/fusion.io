import { Manager, singleton } from "@fusion.io/core";

export type InputHelper = {
    asking(...args: any[]): Promise<any>;
}

@singleton()
export default class Input extends Manager<InputHelper> {

}
