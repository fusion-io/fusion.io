export default class Aborted extends Error {
    message: string;
    constructor(message: string);
}
