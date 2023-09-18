import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '../../../utils/app.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';






@Injectable({providedIn: 'root'})
export class AuthProvider {
    constructor(private httpClient: HttpClient) { }

    login(credentials): Observable<any> {
      const data =
        `username=${encodeURIComponent(credentials.username)}` +
        `&password=${encodeURIComponent(credentials.password)}`;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this.httpClient.post(SERVER_API_URL + 'api/authentication', data, {
      headers:headers,
      observe: 'response',
      withCredentials: true
      });

    }

    
  
    logout(): Observable<any> {
      // logout from the server
      return this.httpClient.post(SERVER_API_URL + 'api/logout', {}, { observe: 'response', withCredentials: true }).pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
    }
}