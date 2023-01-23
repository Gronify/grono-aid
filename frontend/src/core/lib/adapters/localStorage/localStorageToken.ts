import { Token } from "../../entities";

export const ID_ACCESS_TOKEN = "access_token";

export class LocalStorageToken {
  getAccessToken(): string {
    return localStorage.getItem(ID_ACCESS_TOKEN) || "";
  }

  setAccessToken(data: Token): void {
    localStorage.setItem(ID_ACCESS_TOKEN, data.access_token);
  }

  deleteAccessToken(): void {
    localStorage.removeItem(ID_ACCESS_TOKEN);
  }

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }
}
