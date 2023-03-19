import axios, { AxiosRequestConfig, ResponseType } from "axios";

export const axiosInstance = axios.create();

export class RequestBuilder {
  private requestOptions: AxiosRequestConfig = {};

  constructor() {
    this.setDefaultOptions();
  }

  public setBaseUrl(url?: string) {
    this.requestOptions.baseURL = url;
    return this;
  }

  public setHeaders(headers?: { [key: string]: string }) {
    this.requestOptions.headers = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json, text/plain, */*",
      ...this.requestOptions.headers,
      ...headers,
    };
    return this;
  }

  public setResponseType(type: ResponseType = "json") {
    this.requestOptions.responseType = type;
    return this;
  }

  private setDefaultOptions() {
    this.setHeaders();
    this.setResponseType();
    return this;
  }

  get<T>(path: string) {
    return axiosInstance.get<T>(path, this.requestOptions);
  }
}
