import { Protocol } from "@fusion.io/authenticate";
export default class HeadlessLocal implements Protocol {
    private options;
    constructor(options?: {
        usernameField: string;
        passwordField: string;
    });
    resolve(context: any): Promise<{
        username: any;
        password: any;
    }>;
}
