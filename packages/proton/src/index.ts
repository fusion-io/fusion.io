// Native supported services

import ProtonPlasma from "./Plasma";
import {
    DependencyKey,
    PlasmaConstructor,
    Plasma,
    Tokamak,
    Monad,
    MonadConstructor,
    SillyMonad,
    ManagerConfiguration,
    ManagerError,
    Manager,
    AdapterConfiguration,
    Driver,
    SerializerError,
    Serializer,
    tokamak,
    bind,
    singleton,
    bindInversion,
    singletonInversion,
    inject,
    compose,
    serializer,
    serializable,
    loose,
    MiddlewareDispatcher
} from "@fusion.io/core";


import {
    Form,
    Rule,
    RuleSet,
    Validator,
    rules
} from "@fusion.io/validation";

import {
    Aborted,
    Authenticator,
    Gateway,
    IdentityProviderChain,
    UnAuthenticated,
    ContextConsumer,
    Mountable,
    Protocol,
    MountableProtocol,
    IdentityProvider,
    Credential,
    Identity,
    StateVerifier,

    HeadlessLocal,
    HttpOAuth2,
    HttpSession,
    HttpTokenBearer,
    SocketIOToken,
    KoaLocal,
    ExpressLocal,
    SocketIOLocal,
    KoaOAuth2,
    ExpressOAuth2,
    KoaToken,
    ExpressToken,
    KoaSession,
    ExpressSession,

    FacebookIdentityProvider, FacebookCredential,
    GithubIdentityProvider, GithubCredential,
    GoogleIdentityProvider, GoogleCredential,
    InstagramIdentityProvider, InstagramCredential,
    JsonWebTokenIdentityProvider, JsonWebTokenCredential,
    SlackIdentityProvider, SlackCredential
} from "@fusion.io/authenticate";

import {
    Authorizer,
    AuthorizerConfiguration,
    GrantablePolicy,
    Policy,
    ACLConfigPolicy,
    ACLConfiguration,
    HavingRoles,
    UnAuthorized,
    ACLIdentityOrRole,
    AuthorizationContext
} from "@fusion.io/authorization";

import { Locale, Preset } from "@fusion.io/localization";

import {
    Environment as View
} from "@fusion.io/integrations-handlebars";

import { Kernel, Router, ErrorHandlerManager, HandleFunction, ContextAware, middleware, get, del, patch, put, post, route } from "./http";

import { authenticate } from "./authentication/authenticate";
import { authorize } from "./authorization/authorize";

import validate from "./validation/validate";
import RequestRule from "./validation/RequestRule";

export {

    // Core package re-export
    DependencyKey,
    PlasmaConstructor,
    Plasma,
    Tokamak,
    Monad,
    MonadConstructor,
    SillyMonad,
    ManagerConfiguration,
    ManagerError,
    Manager,
    AdapterConfiguration,
    Driver,
    SerializerError,
    Serializer,
    tokamak,
    bind,
    singleton,
    bindInversion,
    singletonInversion,
    inject,
    compose,
    serializer,
    serializable,
    loose,
    MiddlewareDispatcher,


    // Validation package re-export
    Form,
    Rule,
    RuleSet,
    Validator,
    rules,

    // Authentication package re-export

    // Core
    Aborted,
    Authenticator,
    Gateway,
    IdentityProviderChain,
    UnAuthenticated,
    ContextConsumer,
    Mountable,
    Protocol,
    MountableProtocol,
    IdentityProvider,
    Credential,
    Identity,
    StateVerifier,

    // Protocols
    HeadlessLocal,
    HttpOAuth2,
    HttpSession,
    HttpTokenBearer,
    SocketIOToken,
    KoaLocal,
    ExpressLocal,
    SocketIOLocal,
    KoaOAuth2,
    ExpressOAuth2,
    KoaToken,
    ExpressToken,
    KoaSession,
    ExpressSession,

    // IDPs
    FacebookIdentityProvider, FacebookCredential,
    GithubIdentityProvider, GithubCredential,
    GoogleIdentityProvider, GoogleCredential,
    InstagramIdentityProvider, InstagramCredential,
    JsonWebTokenIdentityProvider, JsonWebTokenCredential,
    SlackIdentityProvider, SlackCredential,

    // Authorization package re-export
    Authorizer,
    AuthorizerConfiguration,
    GrantablePolicy,
    Policy,
    ACLConfigPolicy,
    ACLConfiguration,
    HavingRoles,
    UnAuthorized,
    ACLIdentityOrRole,
    AuthorizationContext,

    // Localization package re-export
    Locale,
    Preset,

    // Http package re-export
    Kernel,
    Router,
    ErrorHandlerManager,
    HandleFunction,
    ContextAware,
    middleware,
    get,
    del,
    patch,
    put,
    post,
    route,

    authenticate,
    authorize,

    // Package plasma
    ProtonPlasma,

    View,

    validate,
    RequestRule
}
