import { inject, Plasma as CorePlasma, loose } from "@fusion.io/core";
import Validator from "./Validator";
import {
    nope,
    required,
    array
} from "./rules";

export default class Plasma extends CorePlasma {

    static get ChrisOharaValidators(): { [index: string]: string } {
        return {
            contains        : 'contains',
            equals          : 'equals',
            isAfter         : 'date.after',
            isAlpha         : 'alpha',
            isAlphanumeric  : 'alphaNumeric',
            isAscii         : 'ascii',
            isBase32        : 'base32',
            isBase64        : 'base64',
            isBefore        : 'date.before',
            isBoolean       : 'boolean',
            isCreditCard    : 'creditcard',
            isCurrency      : 'currency',
            isDataURI       : 'dataURI',
            isMagnetURI     : 'magnetURI',
            isDecimal       : 'decimal',
            isDivisibleBy   : 'divisible',
            isEmail         : 'email',
            isEmpty         : 'empty',
            isFQDN          : 'domain',
            isFloat         : 'float',
            isFullWidth     : 'fullwidth',
            isHalfWidth     : 'halfwidth',
            isHash          : 'hash',
            isHexColor      : 'hexcolor',
            isHexadecimal   : 'hexa',
            isIdentityCard  : 'idcard',
            isIP            : 'ip',
            isIPRange       : 'ipv4range',
            isISSN          : 'issn',
            isISIN          : 'isin',
            isISO8601       : 'date.iso8601',
            isRFC3339       : 'date.rfc3339',
            isInt           : 'int',
            isJSON          : 'json',
            isJWT           : 'jwt',
            isLatLong       : 'latlong',
            isLength        : 'length',
            isLowercase     : 'lowercase',
            isMACAddress    : 'macAddress',
            isMD5           : 'md5',
            isMimeType      : 'mime',
            isMobilePhone   : 'phone',
            isMongoId       : 'mongoID',
            isMultibyte     : 'hasMultibyte',
            isNumeric       : 'numeric',
            isPostalCode    : 'postcode',
            isURL           : 'url',
            isUppercase     : 'uppercase',
            matches         : 'matches'
        };
    }

    @inject(Validator)
    compose(validator: Validator) {

        const nativeValidators = require("validator");

        for (let nativeName in Plasma.ChrisOharaValidators) {
            if (Plasma.ChrisOharaValidators.hasOwnProperty(nativeName)) {
                let desiredName = Plasma.ChrisOharaValidators[nativeName];

                validator.extends(desiredName, (value: any, ...args: any[]) => {
                    return (nativeValidators[nativeName] as Function)(value + '', ...args);
                })
            }
        }

        validator
            .extends('*', nope)
            .extends('required', required)
            .extends('array', array)
        ;

        validator.supporting('ajv', ({ schemas, ...options }) => {
            const Ajv = require('ajv');
            const ajv = new Ajv(options);

            Object.entries(schemas).forEach(([name, schema] : [ string, any ]) => {
                ajv.addSchema(schema, name);
            });

            return async (value, schema, context) => {

                const result = await ajv.validate(schema, value);

                context.errors = ajv.errors;

                return result;
            }
        });
    }

    @inject(Validator)
    boot(validator: Validator): void {
        validator.configure(this.config.validation);
    }
}
