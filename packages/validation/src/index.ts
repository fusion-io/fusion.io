import Form from "./Form";
import Rule from "./Rule";
import RuleSet from "./RuleSet";
import ValidationResult from "./ValidationResult";
import Validator from "./Validator";
import { rules } from "./decorator";
import nativeValidators from "validator";

export {
    Form,
    RuleSet,
    Rule,
    Validator,
    ValidationResult,
    rules
}


// Mapping some default supported validation
const ChrisOharaValidators: { [key: string] : string } = {
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

export const plasma = {

    dependencies: [Validator],
    bootstrapper: (validator: Validator) => {
        for (let nativeName in ChrisOharaValidators) {
            if (ChrisOharaValidators.hasOwnProperty(nativeName)) {
                let desiredName = ChrisOharaValidators[nativeName];
                validator.register(desiredName, async (value: any, ...args: any[]) => {
                    // @ts-ignore
                    return await nativeValidators[nativeName](value + '', ...args);
                })
            }
        }
    }
};
