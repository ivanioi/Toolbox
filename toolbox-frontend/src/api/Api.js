/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import axios from "axios";
export var ContentType;
(function (ContentType) {
  ContentType["Json"] = "application/json";
  ContentType["FormData"] = "multipart/form-data";
  ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
  ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
export class HttpClient {
  instance;
  securityData = null;
  securityWorker;
  secure;
  format;
  constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: import.meta.env.VITE_BASE_URL });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }
  setSecurityData = (data) => {
    this.securityData = data;
  };
  mergeRequestParams(params1, params2) {
    const method = params1.method || (params2 && params2.method);
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase()]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }
  stringifyFormItem(formItem) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }
  createFormData(input) {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent = property instanceof Array ? property : [property];
      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }
      return formData;
    }, new FormData());
  }
  request = async ({ secure, path, type, query, format, body, ...params }) => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;
    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body);
    }
    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }
    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}
/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://127.0.0.1:8080
 */
export class Api extends HttpClient {
  api = {
    /**
     * No description
     *
     * @tags simple-file-upload-controller
     * @name UploadFile
     * @summary 通用文件上传接口
     * @request POST:/api/upload/simple
     */
    uploadFile: (query, data, params = {}) =>
      this.request({
        path: `/api/upload/simple`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name InsertOne
     * @request POST:/api/feature/cheatsheet/insertOne
     */
    insertOne: (data, params = {}) =>
      this.request({
        path: `/api/feature/cheatsheet/insertOne`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
    /**
     * @description Test Hello World API
     *
     * @tags hello-world-controller
     * @name HelloWorld
     * @summary Test API
     * @request GET:/api/hello
     */
    helloWorld: (query, params = {}) =>
      this.request({
        path: `/api/hello`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name Query
     * @request GET:/api/feature/cheatsheet/query
     */
    query: (query, params = {}) =>
      this.request({
        path: `/api/feature/cheatsheet/query`,
        method: "GET",
        query: query,
        ...params,
      }),
    /**
     * No description
     *
     * @tags cheat-sheet-controller
     * @name DeleteOne
     * @request GET:/api/feature/cheatsheet/deleteOne/{id}
     */
    deleteOne: (id, params = {}) =>
      this.request({
        path: `/api/feature/cheatsheet/deleteOne/${id}`,
        method: "GET",
        ...params,
      }),
  };
}
