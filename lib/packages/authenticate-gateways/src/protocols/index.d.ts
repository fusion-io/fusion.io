import { ContextConsumer } from "@fusion.io/authenticate";
import HeadlessLocal from "./HeadlessLocal";
import HttpOAuth2 from "./HttpOAuth2";
import HttpSession from "./HttpSession";
import HttpTokenBearer from "./HttpTokenBearer";
import SocketIOToken from "./SocketIOToken";
export { HeadlessLocal, HttpOAuth2, HttpSession, HttpTokenBearer, SocketIOToken };
export declare const callAPI: (options: any) => Promise<any>;
export declare const KoaLocal: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (ctx: any, next: Function) => Promise<any>;
    };
} & typeof HeadlessLocal;
export declare const ExpressLocal: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (request: any, response: any, next: Function) => void;
    };
} & typeof HeadlessLocal;
export declare const SocketIOLocal: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (socket: any, next: Function) => Promise<void>;
    };
} & typeof HeadlessLocal;
export declare const KoaOAuth2: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (ctx: any, next: Function) => Promise<any>;
    };
} & typeof HttpOAuth2;
export declare const ExpressOAuth2: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (request: any, response: any, next: Function) => void;
    };
} & typeof HttpOAuth2;
export declare const KoaToken: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (ctx: any, next: Function) => Promise<any>;
    };
} & typeof HttpTokenBearer;
export declare const ExpressToken: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (request: any, response: any, next: Function) => void;
    };
} & typeof HttpTokenBearer;
export declare const KoaSession: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (ctx: any, next: Function) => Promise<any>;
    };
} & typeof HttpSession;
export declare const ExpressSession: {
    new (...args: any[]): {
        mount(consumer: ContextConsumer): (request: any, response: any, next: Function) => void;
    };
} & typeof HttpSession;
