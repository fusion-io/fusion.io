import { tokamak } from "@fusion.io/core";

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
export default (view: any) => {

    if (!tokamak.bound('services.i18n')) {
        return;
    }

    const i18n = tokamak.make<WithT>('services.i18n');

    // Translation filter
    view.addFilter('t', (key: string, interp: any) => i18n.t(key, interp));

    // Await keyword filter
    view.addFilter('await', (mayBePromise: Promise<any>, callback: Function) =>
            Promise.resolve(mayBePromise)
                .then(result => callback(null, result))
                .catch(error => callback(error))
        , true);

    // Render | Embedded filter
    view.addFilter('render', (maybeRenderable: Renderable, callback: Function) =>
            Promise.resolve(maybeRenderable.render())
                .then((html: string) => {
                    callback(null, new view.runtime.SafeString(html))
                }).catch(error => callback(error))
    , true);
};
