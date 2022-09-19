import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/assets/config';
import { TokenResponse } from 'src/app/models/token-response.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  public saveItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  public resetAll(): void {
    localStorage.clear();
  }

  public getToken(): Observable<TokenResponse> {
    let apiUrl = CONFIG.apiUrl + CONFIG.tokenPath + "request";
    return this.http.get<TokenResponse>(apiUrl);
  }

  public resetToken() {
    let apiUrl = CONFIG.apiUrl + CONFIG.tokenPath + "reset&token=" + this.getItem("api_token");
    return this.http.get<TokenResponse>(apiUrl);
  }
}
