export default class Transaction {
    public fromAddress: string|null;
    public toAddress: string|null;
    public amount: number|null;
    public data: string|null;
    constructor(fromAddress: string, toAddress: string, amount: number, data: string) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.data = data;
    }
}