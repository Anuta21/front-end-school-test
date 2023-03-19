import { RequestBuilder } from "../../common";

export class AuthController {
  private url = `https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`;

  getToken() {
    return new RequestBuilder().get<any>(this.url);
  }
}
