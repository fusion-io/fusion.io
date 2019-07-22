import koaSessionFactory from "koa-session";
import {Config} from "../Contracts";
import ServiceProvider from "../utils/ServiceProvider";
import StorageBridgeSessionStore from "./StorageBridgeSessionStore";
import StartSession from "./StartSession";
import Kernel from "../Http/Kernel";
import ContextSessionMethods from "./ContextSessionMethods";
import SessionStorageManager from "./SessionStorageManager";
import Serializer from "../utils/Serializer";
import SessionSerializer from "./SessionSerializer";

export default class SessionServiceProvider extends ServiceProvider {

    register() {

        this.container.singleton(SessionStorageManager, container => {
            const config = container.make(Config);
            const configForManager = {
                defaultAdapter: 'sessionStoreAdapter',
                adapters: {
                    sessionStoreAdapter: config.get('session')
                }
            };

            return new SessionStorageManager(configForManager, new Serializer());
        });

        this.container.singleton(StartSession, container => {

            const config        = container.make(Config);
            const storeManager  = container.make(SessionStorageManager);
            const bridge        = new StorageBridgeSessionStore(storeManager);

            return [
                koaSessionFactory(
                    { ...config.get('session.options'), store: bridge },
                    container.make(Kernel)
                ),
                ContextSessionMethods
            ];
        });

        this.container.value(SessionSerializer, new SessionSerializer());
    }
}
