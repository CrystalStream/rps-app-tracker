import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from '../../config/app-config.module';
import { AppConfig } from './../models/core/app-config.model';
import { Store } from './../state/app-store';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServerErrorHandlerService } from './server-error-handler.service';
import { AuthTokenService } from './auth-token.service';
import { StorageService } from './storage.service';

import { PtAuthToken, PtUser, PtLoginModel, PtRegisterModel } from './../models/domain';

const CURRENT_USER_KEY = 'CURREN_USER_KEY';

@Injectable()
export class AuthService {

  private get loginUrl() { return `${this.config.apiEndpoint}/auth`; }

  private get registerUrl() { return `${this.config.apiEndpoint}/register`; }

  public get currentUser(): PtUser {
    const user = this.storageService.getItem<PtUser>(CURRENT_USER_KEY);
    if (!this.store.value.currentUser && user) {
    }
    return user;
  }

  public set currentUser(ptUser: PtUser) {
    this.storageService.setItem<PtUser>(CURRENT_USER_KEY, ptUser);
    this.store.set<PtUser>('currentUser', ptUser);
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private store: Store,
    private http: Http,
    private authTokenService: AuthTokenService,
    private storageService: StorageService,
    private errorHandlerService: ServerErrorHandlerService
  ) { }

  public isLoggedIn(): boolean {
    const hasToken = !!this.authTokenService.token;
    // const hasUser = !!this.currentUser;
    return hasToken;
  }


  public login(loginModel: PtLoginModel): Observable<PtUser> {
    this.loginInternal(loginModel)
        .subscribe();
    return this.store.select<PtUser>('currentUser');
  }

  public register(registerModel: PtRegisterModel): Observable<PtUser> {
    this.registerInternal(registerModel)
      .subscribe();
    return this.store.select<PtUser>('currentUser');
  }

  public logout() {
    this.authTokenService.token = { access_token: '', dateExpires: new Date() };
    this.storageService.setItem(CURRENT_USER_KEY, '');
  }

  private loginInternal(loginModel: PtLoginModel) {
    return this.http.post(
      this.loginUrl,
      {
        loginModel: loginModel,
        grant_type: 'password'
      }
    )
      .map( res => res.json())
      .do( (data: {authToken: PtAuthToken, user: PtUser} ) => {
        this.authTokenService.token = data.authToken;
        this.currentUser = data.user;
      })
      .catch(this.errorHandlerService.handleError);
  }

  private registerInternal(registerModel: PtRegisterModel) {
    const header = new Headers();

    return this.http.post(
      this.registerUrl,
      { registerModel: registerModel }
    )
      .map( res => res.json())
      .do( (data: {authToken: PtAuthToken, user: PtUser} ) => {
        this.authTokenService.token = data.authToken;
        this.currentUser = data.user;
      })
      .catch(this.errorHandlerService.handleError);
  }

}
