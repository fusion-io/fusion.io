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
    tokamak,
    bind,
    singleton,
    bindInversion,
    singletonInversion,
    inject
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
    authenticator,
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
    JsonWebtokenIdentityProvider, JWTCredential,
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
    ACLIdentityOrRole
} from "@fusion.io/authorization";

import { Locale, Preset } from "@fusion.io/localization";
import { DatabaseManager } from "@fusion.io/integrations-knex";
import { Kernel, Router, Controller, ErrorHandlerManager, HandleFunction, get, del, patch, put, post, route } from "./http";
import { View, renderable } from "./templating";

import { authenticate } from "./authentication/authenticate";
import { authorize } from "./authorization/authorize";

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
    tokamak,
    bind,
    singleton,
    bindInversion,
    singletonInversion,
    inject,


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
    authenticator,
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
    JsonWebtokenIdentityProvider, JWTCredential,
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

    // Localization package re-export
    Locale,
    Preset,

    // Database package re-export
    DatabaseManager,

    // Http package re-export
    Kernel,
    Router,
    Controller,
    ErrorHandlerManager,
    HandleFunction,
    get,
    del,
    patch,
    put,
    post,
    route,

    // View package re-export
    View,
    renderable,

    authenticate,
    authorize,

    // Package plasma
    ProtonPlasma
}
