import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, AuthResponse } from "../interfaces/Auth";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient){}
  login(auth: Auth): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, auth)
  }
  register(auth: Auth): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register`, auth)
  }
}