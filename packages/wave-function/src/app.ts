import {Tokamak, Kernel, Router, container, plasma as proton} from "@fusion.io/proton";
import {plasma as bus} from "@fusion.io/bus";
import {plasma as database} from "@fusion.io/integrations-knex";
import config from "./config";
import HelloController from "./HelloController";
import {Hub} from "@fusion.io/bus";
import FoobarMessage from "./FoobarMessage";

new Tokamak(config)
    .fuse(proton)
    .fuse(bus)
    .fuse(database)
    .fuse({
        compose(app: Tokamak): void {
            const PubNub = require("pubnub");
            const { services: { pubnub } } = container.make('config');

            container.value('services.pubnub', new PubNub(pubnub))
        }
    })
    .fuse({
        compose(app: Tokamak): void {
            const mqtt = require("mqtt");
            const { services: { mqtt: { host }} } = container.make('config');

            container.value("services.mqtt", mqtt.connect(host))
        }
    })
    .fuse({
        compose(): void {

        },
        boot(): void {
            const kernel = container.make<Kernel>(Kernel);
            const router = container.make<Router>(Router);

            router.group(sub => {
                sub.prefix('/api/v1');
                sub.controller(HelloController);
            });

            kernel.use(router.routes());
            kernel.use(router.allowedMethods());
        }
    })
    .fuse({
        compose() {

        },
        boot() {
            const hub = container.make<Hub>(Hub);

            hub.transportable(FoobarMessage);

            hub.onMessage(async message => {
                console.log(message);
            }, 'fusion.message');
        }
    })
    .start()
;

const kernel = container.make<Kernel>(Kernel);

kernel.listen(process.env.PORT || 2512);