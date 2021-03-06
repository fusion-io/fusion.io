import { StateVerifier, Protocol } from "../Contracts";
import Aborted from "../Aborted";
import UnAuthenticated from "../UnAuthenticated";
import querystring from 'querystring';
import { HttpContext } from "./Contracts";

/**
 * Default scope verifier.
 * It will compare the configured scope and the scope
 * from the OAuth2 server if they are equal.
 *
 * @implements StateVerifier
 */
class SillyStateVerifier implements StateVerifier {

    constructor(private state: string) { }

    public async makeState() {
        return this.state;
    }

    public async verify(stateFromOAuth2Server: string) {
        return stateFromOAuth2Server === this.state.toString();
    }
}

/**
 * This protocol supports the code grant flow.
 *
 * @implements Protocol
 */
export default class HttpOAuth2 implements Protocol {

    private readonly stateVerifier?: StateVerifier;

    /**
     *
     * @param options
     * @return {HttpOAuth2}
     */
    constructor(private options: any) {

        if (!this.options.state) {
            return this;
        }

        // If we got the state configuration. We'll add a state verifier
        // for it.
        this.stateVerifier = ('string' === typeof this.options.state) ?

            // If the state is just a plain string.
            // We'll use the silly verifier.
            new SillyStateVerifier(this.options.state) :

            // Otherwise, considered as the user will use their own
            // verifier.
            this.options.state
        ;

        return this;
    }

    /**
     * Redirects to the Authorize endpoint to start get the granted code.
     *
     * @param response
     * @return {Promise<void>}
     */
    public async redirectToAuthorizeEndpoint({httpContext: {response}}: {httpContext: HttpContext}) {

        let { authorizePath, clientId, redirectUri, scope } = this.options;

        const qs: any = {
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectUri
        };

        if (scope) {
            qs['scope'] = scope instanceof Array ? scope.join(',') : scope;
        }

        // If the state is configured. We'll ask the verifier make a state for us.
        if (this.stateVerifier) {
            qs['state'] = await this.stateVerifier.makeState();
        }

        const authorizeUri = `${authorizePath}?${querystring.stringify(qs)}`;

        response.redirect(authorizeUri);

        // After we redirect. We'll abort this authentication context.
        // The actual authentication is the resolveAccessToken.
        throw new Aborted("Aborted");
    }

    /**
     * Handle redirected from the OAuth2 server to exchange granted code to access_token.
     *
     * @param request
     * @return {Promise<*>}
     */
    public async resolveAccessToken({httpContext: {request}}: {httpContext: HttpContext}) {
        const code = request.query['code'];

        // If the state is configured. We'll ask the verifier to verify if the state
        // is the actual one it sent before.
        if (this.stateVerifier && !await this.stateVerifier.verify(request.query['state'])) {
            throw new UnAuthenticated(`OAuth2 state [${request.query['state']}] is invalid`);
        }

        const payload = {
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            redirect_uri: this.options.redirectUri,
            code,
            grant_type: 'authorization_code'
        };

        const tokenPath = this.options['tokenPath'];

        const axios = require('axios');

        const { data } = await axios({
            url: tokenPath,
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify(payload)
        });

        if ('string' === typeof data) {
            return querystring.decode(data);
        }

        return data;
    }

    /**
     *
     * @param context
     * @return {Promise<*>}
     */
    public async resolve(context: {httpContext: HttpContext}) {
        return context.httpContext.request.query['code'] ?
            // If there was a code. We'll exchange it to get the
            // access_token.
            await this.resolveAccessToken(context) :

            // If no code in the query string. We'll redirect to the OAuth2 server
            // to get one.
            await this.redirectToAuthorizeEndpoint(context)
        ;
    }
}
