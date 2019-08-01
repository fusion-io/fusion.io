export declare function rules(rules: any): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        rules(): any;
    };
} & T;
