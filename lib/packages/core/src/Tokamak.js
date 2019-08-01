"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("@fusion.io/container");
class Tokamak {
    constructor(configuration) {
        this.plasmas = [];
        container_1.container.value('config', configuration);
    }
    fuse(plasma) {
        this.plasmas.push(plasma);
        return this;
    }
    start() {
        this.plasmas.forEach(plasma => {
            const resolved = plasma.dependencies.map(dependency => container_1.container.make(dependency));
            plasma.bootstrapper(...resolved);
        });
    }
}
exports.default = Tokamak;
;
//# sourceMappingURL=Tokamak.js.map