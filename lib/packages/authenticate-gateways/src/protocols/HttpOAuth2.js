"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("@fusion.io/authenticate");
const querystring_1 = __importDefault(require("querystring"));
const request_1 = __importDefault(require("request"));
const util_1 = __importDefault(require("util"));
const callAPI = util_1.default.promisify(request_1.default);
/**
 * Default scope verifier.
 * It will compare the configured scope and the scope
 * from the OAuth2 server if they are equal.
 *
 * @implements StateVerifier
 */
class SillyStateVerifier {
    constructor(state) {
        this.state = state;
    }
    makeState() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.state;
        });
    }
    verify(stateFromOAuth2Server) {
        return __awaiter(this, void 0, void 0, function* () {
            return stateFromOAuth2Server === this.state.toString();
        });
    }
}
/**
 * This protocol supports the code grant flow.
 *
 * @implements Protocol
 */
class HttpOAuth2 {
    /**
     *
     * @param options
     * @return {HttpOAuth2}
     */
    constructor(options) {
        this.options = options;
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
            this.options.state;
        return this;
    }
    /**
     * Redirects to the Authorize endpoint to start get the granted code.
     *
     * @param response
     * @return {Promise<void>}
     */
    redirectToAuthorizeEndpoint({ httpContext: { response } }) {
        return __awaiter(this, void 0, void 0, function* () {
            let { host, path, clientId, redirectUri, scope } = this.options;
            const qs = {
                response_type: 'code',
                client_id: clientId,
                redirect_uri: redirectUri
            };
            if (scope) {
                qs['scope'] = scope instanceof Array ? scope.join(',') : scope;
            }
            // If the state is configured. We'll ask the verifier make a state for us.
            if (this.stateVerifier) {
                qs['state'] = yield this.stateVerifier.makeState();
            }
            if (!path) {
                path = '/oauth2/authorize';
            }
            const authorizeUri = `${host}${path}?${querystring_1.default.stringify(qs)}`;
            response.redirect(authorizeUri);
            // After we redirect. We'll abort this authentication context.
            // The actual authentication is the resolveAccessToken.
            throw new authenticate_1.Aborted("Aborted");
        });
    }
    /**
     * Handle redirected from the OAuth2 server to exchange granted code to access_token.
     *
     * @param request
     * @return {Promise<*>}
     */
    resolveAccessToken({ httpContext: { request } }) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = request.query['code'];
            // If the state is configured. We'll ask the verifier to verify if the state
            // is the actual one it sent before.
            if (this.stateVerifier && !(yield this.stateVerifier.verify(request.query['state']))) {
                throw new authenticate_1.UnAuthenticated(`OAuth2 state [${request.query['state']}] is invalid`);
            }
            const form = {
                client_id: this.options.clientId,
                client_secret: this.options.clientSecret,
                redirect_uri: this.options.redirectUri,
                code,
                grant_type: 'authorization_code'
            };
            const tokenPath = this.options['tokenPath'] || `${this.options.host}/oauth/access_token`;
            // @ts-ignore
            const response = yield callAPI({
                url: tokenPath,
                method: 'POST',
                form,
                json: true
            });
            const responseAsJson = response.toJSON();
            if (response.statusCode >= 300) {
                throw new authenticate_1.UnAuthenticated(`OAuth2 Server Error. Response from server: ${JSON.stringify(responseAsJson.body)}`);
            }
            return responseAsJson.body;
        });
    }
    /**
     *
     * @param context
     * @return {Promise<*>}
     */
    resolve(context) {
        return __awaiter(this, void 0, void 0, function* () {
            return context.httpContext.request.query['code'] ?
                // If there was a code. We'll exchange it to get the
                // access_token.
                yield this.resolveAccessToken(context) :
                // If no code in the query string. We'll redirect to the OAuth2 server
                // to get one.
                yield this.redirectToAuthorizeEndpoint(context);
        });
    }
}
exports.default = HttpOAuth2;
//# sourceMappingURL=HttpOAuth2.js.map