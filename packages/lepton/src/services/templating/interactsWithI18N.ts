import {Environment, runtime} from "nunjucks";
import {container} from "@fusion.io/core";
import {I18N} from "../../serviceLocator";

/**
 * Shape of the i18next
 */
declare type WithT = { t: (key: string, interp: any) => string };

/**
 * A renderable object
 */
declare type Renderable = {
    render: () => string
}

/**
 * Adding service related filters
 *
 * @param view
 */
export default (view: Environment) => {

    const i18n = container.make<WithT>(I18N);

    // Translation filter
    view.addFilter('t', (key: string, interp: any) => i18n.t(key, interp));

    // Await keyword filter
    view.addFilter('await', (mayBePromise: Promise<any>, callback) =>
            Promise.resolve(mayBePromise)
                .then(result => callback(null, result))
                .catch(error => callback(error))
        , true);

    // Render | Embedded filter
    view.addFilter('render', (maybeRenderable: Renderable, callback) =>
            Promise.resolve(maybeRenderable.render())
                .then((html: string) => {
                    callback(null, new runtime.SafeString(html))
                }).catch(error => callback(error))
    , true);
};
