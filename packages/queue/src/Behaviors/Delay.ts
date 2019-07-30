import {Monad} from "@fusion.io/core";

export default class Delay implements Monad {

    private delay: number = 0;

    constructor(private execution: Function) { }

    setDelay(milisec: number) {
        this.delay = milisec;
        return this;
    }

    execute(...args: any[]): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.execution());
            }, this.delay);
        })
    }
}
