import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of, EMPTY, Observable} from 'rxjs';

import {environment} from '../../../../../environments/environment';
import {ProvideHeadersActions} from '../enum/provideHeadersActions.enum';
import {ApiAuth} from '../models/apiAuth.model';
import {ApiResponse} from '../models/apiResponse.model';
import {LoginAuthData} from '../models/loginPayload.model';
import {constructHeaders, cookieNames, getCookie, getDateNowInSeconds} from '../util/util';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  login(authData: LoginAuthData): Observable<ApiResponse<ApiAuth>> {
    return this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/signin/', authData);
  }

  provideHeaders(): Observable<{ headers: AuthHeaders; action: ProvideHeadersActions }> {
    const dateNowInSeconds = getDateNowInSeconds();
    const accessTokenExpTime = +(getCookie(cookieNames.accessTokenExpTime) || 0);
    const refreshTokenExpTime = +(getCookie(cookieNames.refreshTokenExpTime) || 0);

    if (accessTokenExpTime > dateNowInSeconds) {
      return of({
        headers: <AuthHeaders>constructHeaders({
          accessToken: getCookie(cookieNames.accessToken),
        }),
        action: ProvideHeadersActions.NoTokenRefresh,
      });
    } else if (refreshTokenExpTime > dateNowInSeconds) {
      return of({
        headers: <AuthHeaders>constructHeaders({
          accessToken: getCookie(cookieNames.accessToken),
        }),
        action: ProvideHeadersActions.TokenRefresh,
      });
    } else {
      return of({
        headers: {},
        action: ProvideHeadersActions.EmptyHeaders,
      });
    }
  }

  refreshToken(): Observable<ApiResponse<ApiAuth>> {
    return this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/refresh/',
      { refresh_token: getCookie(cookieNames.refreshToken) });
  }

  logout(): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth/signout/', {});
  }
}
