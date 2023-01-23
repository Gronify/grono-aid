export class Token {
  private _access_token;

  constructor(access_token: string) {
    if (!access_token) {
      throw new Error(`Token can't be empty`);
    }

    this._access_token = access_token;
  }

  get access_token(): string {
    return this._access_token;
  }
}
