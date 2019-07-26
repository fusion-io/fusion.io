import {FileSystemLoader, Loader} from "nunjucks";

export default class DotNotationLoader extends FileSystemLoader implements Loader {
    getSource(name: string) {
        return super.getSource(name.split('.').join('/') + '.njk.html');
    }
}