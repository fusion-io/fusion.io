import { Protocol } from "@fusion.io/authenticate";
import { HttpContext } from "./Contracts";
/**
 * @implements Protocol
 */
export default class HttpSession implements Protocol {
    private readonly sessionKey;
    constructor(sessionKey?: string);
    resolve({ session, httpContext: { request } }: {
        session: any;
        httpContext: HttpContext;
    }): Promise<any>;
}
