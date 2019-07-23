import ServiceProvider from "../utils/ServiceProvider";
import {Validator} from "../Contracts";
import ValidatorRegistry from "./ValidatorRegistry";
import validator from "validator";
import lodash from "lodash";
import SessionSerializer from "../Session/SessionSerializer";
import ValidationResult from "./ValidationResult";

/**
 * It's a variable, but I will use Capital since I always respect ChrisOhara
 * because of his library
 *
 * @type {{}}
 */
const ChrisOharaValidators = {
    contains : 'contains',
    equals   : 'equals',
    isAfter  : 'date.after',
    isAlpha  : 'alpha',
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

export default class FormServiceProvider extends ServiceProvider {

    register() {
        this.container.value(Validator, new ValidatorRegistry());
    }

    boot() {
        const registry = this.container.make(Validator);

        lodash.forIn(ChrisOharaValidators, (validatorName, originalName) => {
            registry.register(validatorName, (value, ...args) => validator[originalName](value + '', ...args));
        });

        registry.register('required', value => value !== undefined);

        const sessionSerializer = this.container.make(SessionSerializer);

        sessionSerializer.register(
            'errors',
            validationResult => validationResult.serialize(),
            raw => new ValidationResult(raw)
        );
    }
}
