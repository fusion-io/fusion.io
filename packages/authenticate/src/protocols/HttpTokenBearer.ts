import { Protocol } from "../Contracts";
import { HttpContext } from "./Contracts";
import UnAuthenticated from "../UnAuthenticated";

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
    public async resolve({httpContext: {request}}: {httpContext: HttpContext}) {

        if (request.headers['authorization']) {
            let bearer: string = request.headers['authorization'];

            if (!bearer.startsWith('Bearer ')) {
                throw new UnAuthenticated("No token provided");
            }

            return {token: bearer.replace('Bearer ', '')};
        }

        if (request.query['token']) {
            return {token: request.query['token']};
        }

        if (request.body && request.body['token']) {
            return {token: request.body['token']};
        }

        throw new UnAuthenticated("No token provided");
    }
}
