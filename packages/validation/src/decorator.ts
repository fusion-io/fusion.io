export function rules(rules: any) {
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            rules() {
                return rules;
            }
        }
    }
}
