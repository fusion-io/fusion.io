import NestedHash from "../utils/NestedHash";

export default class ConfigManager extends NestedHash {

    constructor(config = {}) {
        super(config);

        this.currentEnv = '';
    }

    setEnv(environmentName) {
        this.currentEnv = environmentName;

        return this;
    }

    env() {
        return this.currentEnv;
    }
}
