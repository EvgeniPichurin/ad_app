export enum OperationCode {
    OK, UNKNOWN, SERVER_UNAVAILABLE
}
export class OperationCodeMessage {
    constructor(private _code: OperationCode, private _message: string) {}
    get code() {
        return this._code;
    }
    get message() {
        return this._message;
    }
}