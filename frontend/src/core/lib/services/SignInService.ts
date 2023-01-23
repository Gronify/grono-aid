import { Token } from "../entities";
import { LocalStorageToken } from "../adapters";
import { DtoTokenResponse } from "../dto/token";
export class SignInService {
  private _tokenResponse?: DtoTokenResponse;
  private _localStorageToken: LocalStorageToken;

  constructor(tokenResponse?: DtoTokenResponse) {
    this._tokenResponse = tokenResponse;
    this._localStorageToken = new LocalStorageToken();
  }

  signIn(): boolean {
    if (this._tokenResponse?.access_token) {
      const access_token = new Token(this._tokenResponse.access_token);

      if (access_token.access_token) {
        this._localStorageToken.setAccessToken(access_token);

        return true;
      }
    }

    return false;
  }

  signOut(): void {
    this._localStorageToken.deleteAccessToken();
  }
}
