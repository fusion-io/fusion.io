import Yaml from "js-yaml";
import fs from "fs";

export default (argv: any) => {
    const spec = Yaml.safeLoad(fs.readFileSync(argv.rc.neutron.spec).toString());
    return {
        ...argv,
        spec,
        src: process.cwd() + `/${argv.rc.neutron.output}/v${spec.info.version}`
    }
}
