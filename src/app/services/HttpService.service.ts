import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  test = "";
  constructor(private http: HttpClient) {}

  httpGet(url:string) {
    return this.http.get(url);
  }

  httpPost(url:string, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url:string, data:any) {
    return this.http.post(url, data);
  }
}