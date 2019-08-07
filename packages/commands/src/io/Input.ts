import { Manager, singleton } from "@fusion.io/core";

export type InputHelper = {
    asking(...args: any[]): Promise<any>;
}

@singleton()
export default class Input extends Manager<InputHelper> {

    private interactive: boolean = false;

    setInteractive(interactive: boolean) {
        this.interactive = interactive;
        return this;
    }

    ask(type: string, ...questions: any[]) {
        if (this.interactive) {
            return this.adapter(type).asking(...questions);
        }

        return Promise.resolve({});
    }
}
