import RuleSet from "./RuleSet";
import Rule from "./Rule";
import RuleSetMap from "./RuleSetMap";
import Validator from "./Validator";

const validator = new Validator();

validator
    .register('r1', async () => true)
    .register('r2', async () => false)
    .register('r3', async () => true)
    .register('r4', async () => true)
;

const username = validator.compile('r1:a:b:c|r2:d:e:f');
const password = validator.compile('r1:a:b:c|r4:g:h:i');

const map =validator.compileMap({
    username: 'r1:a:b:c|r2:d:e:f',
    password: 'r1:a:b:c|r4:g:h:i'
});

const def = map.toJSON();
console.log(def, validator.compileMap(def));