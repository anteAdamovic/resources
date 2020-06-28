export class RedirectResponse {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public getUrl(): string {
      return this.url;
  }
}