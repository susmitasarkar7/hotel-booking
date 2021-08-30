import { EventService } from './event.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private BASE_API_URL = environment.BASE_API_URL;
  httpOptions: { headers: HttpHeaders; } | any;
  constructor(
    private http: HttpClient,
    private event: EventService,
    // private storage: StorageService
  ) {

    this.event.isLogin.subscribe((isLogin: boolean) => {
      if (isLogin) {
        const TOKEN = 'token';
        this.setHeader(TOKEN);
      } else {
        this.setHeader('false');
      }
    });
  }

  async setHeader(TOKEN: string): Promise<any> {
    if (TOKEN !== 'false') {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
          'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
          'x-rapidapi-key': 'undefined'
        })
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
        })
      };
    }
  }



  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.BASE_API_URL}${path}`, { headers: this.httpOptions.headers, params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: any, body: object = {}, reportProgress = false): Observable<any> {
    return this.http.post(`${this.BASE_API_URL}${path}`, body, { headers: this.httpOptions.headers, reportProgress, })
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any): any {
    return throwError(error.error);
  }
}
