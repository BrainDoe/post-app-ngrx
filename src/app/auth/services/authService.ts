import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://api.realworld.io/api/users';
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(`${this.baseUrl}`, data)
      .pipe(map((res) => res.user));
  }
}
