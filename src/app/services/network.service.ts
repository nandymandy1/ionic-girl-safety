import { Injectable } from "@angular/core";
import { ToastController, NavController, LoadingController } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class NetworkProvider {
  BASEURL = '/api/';

  constructor(
    private toast: ToastController,
    private http: HttpClient,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {

  }



  /*********************** Show Toast */
  async toastPresent(message, cssProp) {
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      color: cssProp,
      duration: 3000
    });
    toast.present();
  }
  /*********************** Show Toast */

  /*********************** Show Loading */

  /*********************** Show Loading */

  /*********************** TOKEN FUNCTION */
  saveToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  destroyToken() {
    localStorage.removeItem('jwt_token');
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  checkValidity(): boolean {
    let token = localStorage.getItem('jwt_token');
    // decode token
    if (token != undefined) {
      let decoded = jwt_decode((token).split(' ')[1]);
      if (decoded.exp < (Date.now() / 1000)) {
        // means the token is expired and then delete the token
        this.destroyToken();
        return false;
      } else {
        // token is still valid
        return true;
      }
    }
    // there is no token available in the localstorage
    return false;
  }

  // Get current authenticated user
  authUser() {
    let token = localStorage.getItem('jwt_token');
    if (token != undefined) {
      let decoded = jwt_decode((token).split(' ')[1]);
      return decoded._id;
    }
  }

  // Get the username
  getusername(): string {
    let token = localStorage.getItem('jwt_token');
    if (token != undefined) {
      let decoded = jwt_decode((token).split(' ')[1]);
      return decoded.name;
    } else {
      return '';
    }
  }

  // Get the user._id
  getuserId(): string {
    let token = localStorage.getItem('jwt_token');
    if (token != undefined) {
      let decoded = jwt_decode((token).split(' ')[1]);
      return decoded._id;
    } else {
      return '';
    }
  }

  returnUserType() {
    let token = localStorage.getItem('jwt_token');
    let decoded = jwt_decode((token).split(' ')[1]);
    return decoded.type;
  }
  /*********************** TOKEN FUNCTION */

  /*********************** HTTP REQUESTS*/
  // POST DATA FOR PUBLIC ROUTES Like Login and Register
  postData(url, data) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(`${this.BASEURL}${url}`, data, { headers })
      .pipe(tap((res: any) => {
        // save the token to the local storage
        if (res.token != undefined) {
          this.saveToken(res.token);
        }
      }),
        catchError(this.handleError)
      );
  }

  // GET DATA FOR PUBLIC ROUTES
  getData(url) {
    return this.http.get(`${this.BASEURL}${url}`);
  }

  // Only for the authenticated routes
  getAuthData(url, params?: Object) {
    // Preparing headers
    let httpOptions = {};
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.getToken()
    });
    httpOptions['headers'] = headers;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      httpOptions['params'] = sParams;
    }
    return this.http.get(`${this.BASEURL}${url}`, httpOptions);
  }

  postAuthData(url, data, params?: Object) {
    let token = this.getToken();
    let body = JSON.stringify(data);

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token
    });

    let options;
    if (params) {
      let sParams: HttpParams = new HttpParams();
      for (var key in params) {
        sParams = sParams.append(key, params[key]);
      }
      options = {
        headers: headers,
        params: sParams
      };
    } else {
      options = { headers: headers };
    }

    return this.http.post(`${this.BASEURL}${url}`, body, options);
  }

  // Delete the authenticated data
  deleteAuthData(url, params?: Object) {
    let token = this.getToken();

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token
    });

    let options = { headers: headers };

    return this.http.delete(`${this.BASEURL}${url}`, options);
  }

  /*********************** HTTP REQUESTS*/

  handleError(error) {
    let errorMessage = "";

    if (error.error.username) {
      errorMessage = `${errorMessage} ${error.error.username}`
    }
    if (error.error.password) {
      errorMessage = `${errorMessage} ${error.error.password}`
    }
    if (error.error.email) {
      errorMessage = `${errorMessage} ${error.error.email}`
    }
    return errorMessage;
  }

}
