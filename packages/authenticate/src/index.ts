import Aborted from "./Aborted";
import Authenticator from "./Authenticator";
import Gateway from "./Gateway";
import IdentityProviderChain from "./IdentityProviderChain";
import UnAuthenticated from "./UnAuthenticated"
import {tokamak as container} from "@fusion.io/core";

export {
    Aborted,
    Authenticator,
    Gateway,
    IdentityProviderChain,
    UnAuthenticated
}

export const authenticator = new Authenticator();

export * from "./Contracts";


export const plasma = {
    compose: () => {
        container.value(Authenticator, authenticator);
    }
};
