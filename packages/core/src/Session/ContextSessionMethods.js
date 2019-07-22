import SessionManager from "./SessionManager";
import SessionSerializer from "./SessionSerializer";
import {container} from "@fusion.io/container";

export default async (context, next) => {

    // Extract the session payload

    let serializedPayload = context.session['fusionSession'] || [];
    let sessionManager    = new SessionManager(container.make(SessionSerializer));

    sessionManager.load(serializedPayload);

    context.session.set = (...parameters) => {
        sessionManager.set(...parameters);
        return context;
    };

    context.session.get = (...parameters) => {
        return sessionManager.get(...parameters);
    };

    context.session.unset = (...parameters) => {
        sessionManager.unset(...parameters);
        return context;
    };

    context.session.forget = () => {
        sessionManager.forget();
        return context;
    };

    context.session.flash = (...parameters) => {
        sessionManager.flash(...parameters);
        return context;
    };

    context.with = (key, value) => {
        context.session.flash(key, value);

        return context;
    };

    context.withError = value => {
        context.session.flash('errors', value);

        return context;
    };

    context.errors = () => context.session.get('errors');

    await next();

    context.session['fusionSession'] = sessionManager.serialize();
}