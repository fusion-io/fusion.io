"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("./Form"));
exports.Form = Form_1.default;
const Rule_1 = __importDefault(require("./Rule"));
exports.Rule = Rule_1.default;
const RuleSet_1 = __importDefault(require("./RuleSet"));
exports.RuleSet = RuleSet_1.default;
const Validator_1 = __importDefault(require("./Validator"));
exports.Validator = Validator_1.default;
const decorator_1 = require("./decorator");
exports.rules = decorator_1.rules;
const validator_1 = __importDefault(require("validator"));
// Mapping some default supported validation
const ChrisOharaValidators = {
    contains: 'contains',
    equals: 'equals',
    isAfter: 'date.after',
    isAlpha: 'alpha',
    isAlphanumeric: 'alphaNumeric',
    isAscii: 'ascii',
    isBase32: 'base32',
    isBase64: 'base64',
    isBefore: 'date.before',
    isBoolean: 'boolean',
    isCreditCard: 'creditcard',
    isCurrency: 'currency',
    isDataURI: 'dataURI',
    isMagnetURI: 'magnetURI',
    isDecimal: 'decimal',
    isDivisibleBy: 'divisible',
    isEmail: 'email',
    isEmpty: 'empty',
    isFQDN: 'domain',
    isFloat: 'float',
    isFullWidth: 'fullwidth',
    isHalfWidth: 'halfwidth',
    isHash: 'hash',
    isHexColor: 'hexcolor',
    isHexadecimal: 'hexa',
    isIdentityCard: 'idcard',
    isIP: 'ip',
    isIPRange: 'ipv4range',
    isISSN: 'issn',
    isISIN: 'isin',
    isISO8601: 'date.iso8601',
    isRFC3339: 'date.rfc3339',
    isInt: 'int',
    isJSON: 'json',
    isJWT: 'jwt',
    isLatLong: 'latlong',
    isLength: 'length',
    isLowercase: 'lowercase',
    isMACAddress: 'macAddress',
    isMD5: 'md5',
    isMimeType: 'mime',
    isMobilePhone: 'phone',
    isMongoId: 'mongoID',
    isMultibyte: 'hasMultibyte',
    isNumeric: 'numeric',
    isPostalCode: 'postcode',
    isURL: 'url',
    isUppercase: 'uppercase',
    matches: 'matches'
};
exports.plasma = {
    dependencies: [Validator_1.default],
    bootstrapper: (validator) => {
        for (let nativeName in ChrisOharaValidators) {
            if (ChrisOharaValidators.hasOwnProperty(nativeName)) {
                let desiredName = ChrisOharaValidators[nativeName];
                validator.register(desiredName, (value, ...args) => __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    return yield validator_1.default[nativeName](value + '', ...args);
                }));
            }
        }
    }
};
//# sourceMappingURL=index.js.map