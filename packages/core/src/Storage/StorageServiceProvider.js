import ServiceProvider from "../utils/ServiceProvider";
import {Config, Storage} from "../Contracts";
import StorageManager from "./StorageManager";
import Serializer from "../utils/Serializer";

export default class StorageServiceProvider extends ServiceProvider {

    register() {
        this.container.singleton(Storage, (container) => {
            const config = container.make(Config);

            return new StorageManager(config.get('storage'), new Serializer());
        })
    }
}
