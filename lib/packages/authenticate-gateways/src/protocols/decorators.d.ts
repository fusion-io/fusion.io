import { ContextConsumer } from "@fusion.io/authenticate";
export declare function mountExpress<T extends {
    new (...args: any[]): {};
}>(Protocol: T): {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (request: any, response: any, next: Function) => void;
    };
} & T;
export declare function mountKoa<T extends {
    new (...args: any[]): {};
}>(Protocol: T): {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (ctx: any, next: Function) => Promise<any>;
    };
} & T;
export declare function mountSocketIO<T extends {
    new (...args: any[]): {};
}>(Protocol: T): {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (socket: any, next: Function) => Promise<void>;
    };
} & T;
