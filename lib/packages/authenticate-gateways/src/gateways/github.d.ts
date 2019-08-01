import { Gateway, IdentityProvider } from "@fusion.io/authenticate";
export declare const createGateway: (framework: string, options: any, provider: IdentityProvider) => Gateway;
/**
 *
 * @param options
 * @param {IdentityProvider} provider
 * @return {Gateway}
 */
export declare const createExpressGateway: (options: any, provider: IdentityProvider) => Gateway;
/**
 *
 * @param options
 * @param provider
 * @return {Gateway}
 */
export declare const reateKoaGateway: (options: any, provider: IdentityProvider) => Gateway;
