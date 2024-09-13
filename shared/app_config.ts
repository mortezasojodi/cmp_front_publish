import { getToken } from "./service/auth/get_token";

import { APP_ROUTES } from "./route/app_route";
import { removeToken } from "./service/auth/remoe_token";

export class AppConfigHeader {
  static async tokenheader() {
    var token = await getToken();
    return {
      "Authorization": `Bearer ${token}`
    };
  }
  static async header() {
    var token = await getToken();
    return {
      'accept': '*/*',
      'Content-Type': 'application/json-patch+json', "Authorization": `Bearer ${token}`
    };
  }
  static async hastoken(): Promise<boolean> {
    var token = await getToken();
    return token != null && token != '';
  }
}
export class AppConfig {

  public static _token = null;
  static set token(token: string) {
    console.log(token);
    AppConfig._token = token;
  }
  static get token(): string {
    return AppConfig._token
  }
  public static logOut(replace) {
    removeToken();
    AppConfig._token = null;
    replace(APP_ROUTES.Splash, undefined, { shallow: true });
  }

  public static async init() {
    var token = await getToken();
    if (token) {
      this._token = token;
    }
  }


}
