/**
 * An error that will be thrown if the authentication process
 * was failed.
 */
export default class UnAuthenticated extends Error {
    readonly code: number;
}
