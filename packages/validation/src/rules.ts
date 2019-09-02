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
 *
 * @param value
 */
export const array = async (value: any) => {
    return Array.isArray(value)
};
