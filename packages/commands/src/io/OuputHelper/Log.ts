import { OutputHelper } from "../Output";

export default class Log implements OutputHelper {

    async showing(message: string, level = 'message') {
        console.log(message);
    };
}
