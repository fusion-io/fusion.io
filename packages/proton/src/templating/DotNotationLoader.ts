import { FileSystemLoader, Loader } from "nunjucks";

/**
 * Just wrap the FileSystemLoader to have a nicer view path name
 */
export default class DotNotationLoader extends FileSystemLoader implements Loader {
    getSource(name: string) {
        return super.getSource(name.split('.').join('/') + '.njk.html');
    }
}