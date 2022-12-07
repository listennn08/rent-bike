import axios from "axios";

import type { RawAxiosRequestHeaders, AxiosPromise, Method } from "axios";
import { isEmpty } from "lodash";

export const setToken = async (): Promise<TokenInfo | undefined> => {
  try {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", process.env.CLIENT_ID);
    data.append("client_secret", process.env.CLIENT_SECRET);
    const resp = await axios.post(
      "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );
    return resp.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const createInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: `https://tdx.transportdata.tw/api${baseUrl}`,
  });

  instance.interceptors.request.use((config) => {
    const tokenInfo: TokenInfo = JSON.parse(
      localStorage.getItem("token") || "{}",
    );
    if (!isEmpty(tokenInfo)) {
      const { token_type, access_token } = tokenInfo;
      config.headers = {
        ...config.headers,
        Authorization: `${token_type} ${access_token}`,
      };
    }

    return config;
  });
  function request(
    url: string,
    data: any = {},
    method: Method,
    headers?: RawAxiosRequestHeaders,
  ): AxiosPromise<any> {
    return new Promise((resovle, reject) => {
      instance({ url, data, headers, method }).then(resovle).catch(reject);
    });
  }

  return {
    GET: (url: string, headers?: RawAxiosRequestHeaders) =>
      request(url, {}, "get", headers),
    POST: (url: string, data: any = {}, headers?: RawAxiosRequestHeaders) =>
      request(url, data, "post", headers),
    PUT: (url: string, data: any = {}, headers?: RawAxiosRequestHeaders) =>
      request(url, data, "put", headers),
    PATCH: (url: string, data: any = {}, headers?: RawAxiosRequestHeaders) =>
      request(url, data, "patch", headers),
    DELETE: (url: string, headers?: RawAxiosRequestHeaders) =>
      request(url, {}, "delete", headers),
  };
};
