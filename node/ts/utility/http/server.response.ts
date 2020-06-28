export class ServerResponse {
    private status: number;
    private data: any;

    constructor(status: number, data: any = null) {
        this.status = status;
        this.data = data;
    }

    public getStatus(): number {
        return this.status;
    }

    public hasData(): boolean {
        return this.data !== null;
    }

    public getData(): any {
        return this.data;
    }
}