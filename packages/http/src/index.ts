import Controller from "./Controller";
import Router from "./Router";
import Kernel from "./Kernel";

export {
    Controller,
    Router,
    Kernel
}

export * from "./decorators";

export const plasma = {
    dependencies: [],
    bootstrapper: () => { }
};
