export default interface Message {
    channel(): string|string[],
    payload?(): any
}
