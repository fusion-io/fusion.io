import {Environment} from "nunjucks";
import ConfidentialExtension from "./ConfidentialExtension";

/**
 * We'll provide some special operations to ensure that the user is logged in correctly or not
 *
 * @param view
 */
export default (view: Environment) => {

    /**
     * Filter some data with un-authenticated users
     */
    view.addFilter('confidential', (data, replacement = '') => {

        try {
            // @ts-ignore = Huh? They forgot the `getGlobal()` in @types '______'!
            const context = view.getGlobal('context');
            return context.identity ? data : replacement;
        } catch (e) {
            return replacement;
        }

    });

    /**
     * Custom tags for view confidential content
     */
    view.addExtension('ConfidentialExtension', new ConfidentialExtension());
};
