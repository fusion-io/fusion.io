import KoaRouter from "koa-router";
import { ControllerConstructor } from "./Controller";
/**
 * Shape of the Route Group factory
 */
export declare type GroupCallback = (router: Router) => any;
/**
 * We'll extends Koa
 */
export default class Router extends KoaRouter {
    /**
     * Register a route by controller
     *
     * @param Constructor
     */
    controller(Constructor: ControllerConstructor): Router;
    /**
     *
     * @param name
     * @param args
     */
    get(name: string, ...args: any[]): any;
    /**
     *
     * @param name
     * @param args
     */
    post(name: string, ...args: any[]): any;
    /**
     *
     * @param name
     * @param args
     */
    put(name: string, ...args: any[]): any;
    /**
    *
    * @param name
    * @param args
    */
    patch(name: string, ...args: any[]): any;
    /**
     *
     * @param name
     * @param args
     */
    delete(name: string, ...args: any[]): any;
    /**
     * Group the routes. So we can apply configuration easier
     *
     * @param callback
     */
    group(callback: GroupCallback): this;
}
