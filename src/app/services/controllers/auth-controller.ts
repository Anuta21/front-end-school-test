import { RequestBuilder } from "../../common";

export class AuthController {
  private url = `https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`;

  getToken() {
    return new RequestBuilder()
      .setHeaders({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWM4ZGJiYS0yNzUzLTQ1ODAtYWMwZS1iNzA0YTc5MmU0NDQiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwMjI3ODYsImV4cCI6MTY3OTkyMjc4Nn0.VAsL23AnJ-wCmbMd27F8X1Q4DwW9ExsXB7ejGDpVUhs",
      })
      .get<any>(this.url);
  }
}
