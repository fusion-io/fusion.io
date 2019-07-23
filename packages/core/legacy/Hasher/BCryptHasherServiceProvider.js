import BCryptHasher from "./BCryptHasher";
import {Config, Hasher} from "../Contracts";
import ServiceProvider from "../utils/ServiceProvider";

export default class BCryptHasherServiceProvider extends ServiceProvider {

    register() {
        this.container.singleton(Hasher, container => {
            const config = container.make(Config);

            return new BCryptHasher().setSaltRouds(config.get('hash.rounds', 10));
        });
    }
}
