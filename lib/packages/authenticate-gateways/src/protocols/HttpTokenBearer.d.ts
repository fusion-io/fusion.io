import { Protocol } from "@fusion.io/authenticate";
import { HttpContext } from "./Contracts";
/**
 * @implements Protocol
 */
export default class HttpTokenBearer implements Protocol {
    /**
     * Resolve the token from the request
     *
     * @param request
     * @return {*}
     */
    resolve({ httpContext: { request } }: {
        httpContext: HttpContext;
    }): Promise<{
        token: any;
    }>;
}
