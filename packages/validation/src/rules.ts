/**
 * Validate if the value is existed/declared
 *
 * @param value
 */
export const required = async (value: any) => (value !== undefined && value !== null);

/**
 * Always valid validator
 */
export const nope = async () => true;

/**
 * Check if the given string value has length in the
 * given range
 *
 * @param value
 * @param min
 * @param max
 */
export const length = async (value: string|any[], min: string, max?: string) => {
    const minLength     = parseInt(min);
    const safetyValue   = Array.isArray(value) ? value : value + '';

    if (!max) {
        return safetyValue.length >= minLength;
    }

    const maxLength = parseInt(max);

    return safetyValue.length >= minLength &&
        safetyValue.length <= maxLength
};

/**
 * Check if the given number value in a given range
 *
 * @param value
 * @param min
 * @param max
 */
export const range = async (value: number|any, min: string, max?: string) => {
    if ('number' !== typeof value) {
        return false;
    }
    const minValue = parseFloat(min);

    if (!max) {
        return value >= minValue;
    }

    const maxValue  = parseFloat(max);

    return value >= minValue &&
        value <= maxValue
};

/**
 *
 * @param value
 */
export const array = async (value: any) => {
    return Array.isArray(value)
};
