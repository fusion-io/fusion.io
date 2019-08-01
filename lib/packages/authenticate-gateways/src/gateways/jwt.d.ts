import { Gateway, IdentityProvider } from "@fusion.io/authenticate";
export declare const createGateway: (framework: string, privateKey: string, provider: IdentityProvider) => Gateway;
export declare const createExpressGateway: (privateKey: string, provider: IdentityProvider) => Gateway;
export declare const createKoaGateway: (privateKey: string, provider: IdentityProvider) => Gateway;
export declare const createSocketIOGateway: (privateKey: string, provider: IdentityProvider) => Gateway;
