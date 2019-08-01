import { Protocol } from "@fusion.io/authenticate";
import { HttpContext } from "./Contracts";
/**
 * This protocol supports the code grant flow.
 *
 * @implements Protocol
 */
export default class HttpOAuth2 implements Protocol {
    private options;
    private readonly stateVerifier?;
    /**
     *
     * @param options
     * @return {HttpOAuth2}
     */
    constructor(options: any);
    /**
     * Redirects to the Authorize endpoint to start get the granted code.
     *
     * @param response
     * @return {Promise<void>}
     */
    redirectToAuthorizeEndpoint({ httpContext: { response } }: {
        httpContext: HttpContext;
    }): Promise<void>;
    /**
     * Handle redirected from the OAuth2 server to exchange granted code to access_token.
     *
     * @param request
     * @return {Promise<*>}
     */
    resolveAccessToken({ httpContext: { request } }: {
        httpContext: HttpContext;
    }): Promise<any>;
    /**
     *
     * @param context
     * @return {Promise<*>}
     */
    resolve(context: {
        httpContext: HttpContext;
    }): Promise<any>;
}
