const headers: RequestInit = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  method: "POST",
};

export class FetchService {
  constructor(private baseUrl: string) {}
  public async post(relUrl: string, reqInit?: RequestInit) {
    return fetch(`${this.baseUrl}${relUrl}`, { ...reqInit, ...headers });
  }
}
