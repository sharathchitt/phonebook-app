import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * get all numbers
   */
   getNumbers(): Observable<Number[]> {
    return this.http.get<Number[]>(this.baseUrl + '/get')
    .pipe(catchError(this.formatErrors));
  }

  /**
   * get one by id
   * @param id number id
   */
  getNumberById(id: string): Observable<Number> {
    return this.http.get<Number>(this.baseUrl + '/get/' + id)
    .pipe(catchError(this.formatErrors));
  }

  /**
   * create number with post request
   * @param number number object
   */
  createNumber(number: Number): Observable<Number> {
    return this.http.post<Number>(this.baseUrl + '/post', number)
    .pipe(catchError(this.formatErrors));
  }

  /**
   * edit number
   * @param number updated number object
   */
  editNumber(number: Number): Observable<Number> {
    return this.http.put<Number>(this.baseUrl + '/put', number)
    .pipe(catchError(this.formatErrors));
  }

  /**
   * delete number by id
   * @param id id of the number
   */
  deleteNumber(id: string): Observable<Number> {
    return this.http.delete<Number>(this.baseUrl + '/delete/' + id)
    .pipe(catchError(this.formatErrors));
  }

  /**
   * Error handler
   * @param error error
   */
  private formatErrors(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something went wrong.');
  }


}
