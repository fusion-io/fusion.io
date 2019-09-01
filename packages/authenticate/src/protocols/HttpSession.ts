import { Protocol } from "../Contracts";
import { HttpContext } from "./Contracts";
import UnAuthenticated from "../UnAuthenticated";

/**
 * @implements Protocol
 */
export default class HttpSession implements Protocol {

    constructor(private readonly sessionKey = 'credential') { }

    public async resolve({ httpContext } : { httpContext: any }) {

        const session = httpContext.session || httpContext.request.session;

        if (!session) {
            throw new Error("Session is not started");
        }

        if (!session[this.sessionKey]) {
            throw new UnAuthenticated("UnAuthenticated");
        }

        return session[this.sessionKey];
    }
}
