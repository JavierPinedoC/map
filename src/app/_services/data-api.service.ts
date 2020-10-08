import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Estados } from '../models/estados';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  apiURL = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        // "Allow": "GET, POST, OPTIONS, PUT, DELETE"

      })
    } 

    getEstados(): Observable<Estados> {
      console.log("estados: " + this.apiURL);
      return this.http.get<Estados>(this.apiURL + 'estados', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  

    getAllEstados() {
      const path = `${this.apiURL}estados`;
      return this.http.get<Estados>(path, this.httpOptions);
    }
  


    handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }
}
