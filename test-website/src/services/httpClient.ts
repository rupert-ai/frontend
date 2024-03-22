const getErrorObject = (err: any, response: Response) => {
  return { ...err, statusCode: response.status };
};

export class HttpClient {
  static async get(url: string, accessToken: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
        Accept: 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw getErrorObject(err, response);
  }

  static async post(url: string, accessToken: string, body?: FormData | string, headers?: Record<string, string>) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        ...headers,
      },
      body,
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw getErrorObject(err, response);
  }
}
