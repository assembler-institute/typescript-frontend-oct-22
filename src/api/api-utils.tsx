import axios, { AxiosPromise, AxiosStatic } from 'axios';

export interface Response {
  isSuccessfull: boolean,
  data: any,
  errorMessage: string | null;
}

export function createDefaultResponse(): Response {
  return {
    isSuccessfull: false,
    data: null,
    errorMessage: null
  };
}

export async function normalizeResponse(promise: AxiosPromise): Promise<Response> {
  const defaultResponse: Response = createDefaultResponse();
  let networkResponse: any = null;

  try {
    networkResponse = await promise;
    defaultResponse.data = networkResponse.data;
  }
  catch (error: any) {
    defaultResponse.errorMessage = error.message;
  }
  return defaultResponse;
}

export function makeRequest(
  httpClient: AxiosStatic = axios,
  baseURL: string = import.meta.env.VITE_API_BASE_URL,
  baseHeaders: Record<string, string> = {
    Accept: 'application/json',
  }
) {
  return async function request({
    url = '/',
    requestMethod = 'GET',
    body = {},
    headers = {},
  }: {

    url?: string,
    requestMethod?: string,
    body?: Record<string, string>;
    headers?: Record<string, string>;

  }): Promise<Response> {
    return normalizeResponse(
      httpClient({
        url: `${baseURL}${url}`,
        method: requestMethod,
        data: body,
        headers: {
          ...baseHeaders,
          ...headers,
        },
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 400;
        },
      })
    );
  };
}