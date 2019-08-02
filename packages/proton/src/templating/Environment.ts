import { tokamak } from "@fusion.io/core";
import { Environment } from "nunjucks";
import DotNotationLoader from "./DotNotationLoader";

tokamak.singleton(Environment, () => {
    const { view } = tokamak.make<any>('config');

    return new Environment(new DotNotationLoader(view));
});

export default Environment;
