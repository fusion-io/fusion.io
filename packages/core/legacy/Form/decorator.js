export const form = (rules) => Target => {
    return class extends Target {
        rules() {
            return rules;
        }
    }
};
