// Native supported services

import ProtonPlasma from "./Plasma";
import {
    DependencyKey,
    PlasmaConstructor,
    Plasma,
    Tokamak,
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
    createFacebookExpressGateway,
    createFacebookGateway,
    createFacebookKoaGateway,
    createGoogleExpressGateway,
    createGoogleGateway,
    createGoogleKoaGateway,
    createInstagramExpressGateway,
    createInstagramGateway,
    createInstagramKoaGateway,
    createJWTExpressGateway,
    createJWTGateway,
    createJWTKoaGateway,
    createJWTSocketIOGateway,
    createSlackExpressGateway,
    createSlackGateway,
    createSlackKoaGateway
} from "@fusion.io/authenticate";

import {
    Authorizer,
    AuthorizerConfiguration,
    GrantablePolicy,
    Policy,
    ACLConfigPolicy,
    ACLConfiguration,
    HavingRoles,
    ACLIdentityOrRole
} from "@fusion.io/authorization";

import { Locale, Preset } from "@fusion.io/localization";
import { DatabaseManager } from "@fusion.io/integrations-knex";
import { Kernel, Router, Controller, get, del, patch, put, post, route } from "./http";
import { View, renderable } from "./templating";

export {

    // Core package re-export
    DependencyKey,
    PlasmaConstructor,
    Plasma,
    Tokamak,
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
    createFacebookExpressGateway,
    createFacebookGateway,
    createFacebookKoaGateway,
    createGoogleExpressGateway,
    createGoogleGateway,
    createGoogleKoaGateway,
    createInstagramExpressGateway,
    createInstagramGateway,
    createInstagramKoaGateway,
    createJWTExpressGateway,
    createJWTGateway,
    createJWTKoaGateway,
    createJWTSocketIOGateway,
    createSlackExpressGateway,
    createSlackGateway,
    createSlackKoaGateway,

    // Authorization package re-export
    Authorizer,
    AuthorizerConfiguration,
    GrantablePolicy,
    Policy,
    ACLConfigPolicy,
    ACLConfiguration,
    HavingRoles,
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
    get,
    del,
    patch,
    put,
    post,
    route,

    // View package re-export
    View,
    renderable,

    // Package plasma
    ProtonPlasma
}
