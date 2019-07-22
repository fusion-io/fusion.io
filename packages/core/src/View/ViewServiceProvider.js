import ServiceProvider from "../utils/ServiceProvider";
import {Config, View} from "../Contracts";
import ViewFactory from "./ViewFactory";
import ViewEngineNunjucks from "./NunjucksEngine/ViewEngineNunjucks";
import {FileSystemLoader, Environment as NunjucksEnv} from "nunjucks";
import HalEngine from "./HalEngine/HalEngine";

export default class ViewServiceProvider extends ServiceProvider {

    register() {
        this.container.value(View, new ViewFactory());
        this.container.singleton(ViewEngineNunjucks, (container) => {
            const config = container.make(Config);
            return new ViewEngineNunjucks(
                new NunjucksEnv(
                    new FileSystemLoader(config.get('view.directory'),
                    config.get('view.options')
                    )
                )
            )
        });

        this.container.value(HalEngine, new HalEngine());
    }

    boot() {
        const engine = this.container.make(ViewEngineNunjucks);

        engine.getEnv().addFilter('render', function(target, callback) {
            target.render(true)
                .then(firstStepView => engine.render(firstStepView))
                .then(embedded => callback(null, engine.getEnv().getFilter('safe')(embedded)))
                .catch(error => callback(error))
            ;
        }, true);
    }
}
