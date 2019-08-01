import { DependencyKey } from "@fusion.io/container";
declare type Plasma = {
    dependencies: DependencyKey[];
    bootstrapper(...dependencies: any[]): void;
};
export default class Tokamak {
    private plasmas;
    constructor(configuration: any);
    fuse(plasma: Plasma): this;
    start(): void;
}
export {};
