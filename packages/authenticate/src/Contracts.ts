/**
 * A callback function that consumes the context,
 * runs the authentication and returns the Identity.
 */
export interface ContextConsumer { (context: Object): Promise<Identity> }

/**
 * In the most cases, the protocol by itself can resolve
 * the authentication context. If so, it is a Mountable protocol.
 * Which can mount into the transport layer and populate the context.
 *
 */
export interface Mountable {
    mount(consumer: ContextConsumer): any;
}

/**
 * A Protocol is a service the will resolve the `Credential` from a given context.
 */
export interface Protocol {

    /**
     * Load (resolve) the credential
     *
     * @param context
     */
    resolve(context: Object): Promise<Credential>;
}

/**
 * Define abstract type.
 */
export type MountableProtocol = Protocol | Mountable;

/**
 * The service that will find an Identity satisfied the given Credential.
 */
export interface IdentityProvider {

    /**
     *
     * Providing the identity against the given credential.
     *
     * @param credential
     */
    provide(credential: Credential): Promise<Identity|null>;
}

/**
 * A piece of information that can be used for authenticating
 */
export interface Credential {

}

/**
 * A piece of information that can be used for identifying
 * a resource.
 */
export interface Identity {

}

/**
 * A service for verifying the an oauth2 state
 */
export interface StateVerifier {

    /**
     * Generates the state when the Protocol call the authorize request.
     */
    makeState(): Promise<string>;

    /**
     * Determine if the state responded from the OAuth2 server is valid.
     *
     * @param stateFromOAuth2Server
     */
    verify(stateFromOAuth2Server: Object): Promise<boolean>
}
