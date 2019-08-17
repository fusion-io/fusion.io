export default interface Message {
    channel(): string
    as?(): string
    payload?(): any
}
