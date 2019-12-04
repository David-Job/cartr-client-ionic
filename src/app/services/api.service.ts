import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = 'http://localhost8080/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getAll<T>(entityUrl:string): Observable<T[]> {
    const url = `${apiUrl}/${entityUrl}s`;
    console.log(url);
    return this.http.get<T[]>(`${apiUrl}/${entityUrl}s`).pipe(
      tap(item => console.log('fetched items')),
      catchError(this.handleError('getAllItems', []))
    );
  }

  get<T>(id: any, entityUrl:string): Observable<T> {
    const url = `${apiUrl}/${entityUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => console.log(`fetched item id=${id}`)),
      catchError(this.handleError<T>(`getItem id=${id}`))
    );
  }

  add<T>(entity: T, entityUrl:string): Observable<T> {
    return this.http.post<T>(`${apiUrl}/${entityUrl}s`, entity, httpOptions).pipe(
      tap((entity: T) => console.log(`added item`)),
      catchError(this.handleError<T>('addItem'))
    );
  }

  update<T>(id: any, entity: any, entityUrl:string): Observable<any> {
    const url = `${apiUrl}/${entityUrl}/${id}`;
    return this.http.put(url, entity, httpOptions).pipe(
      tap(() => console.log(`updated item id=${id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  delete<T>(id: any, entityUrl:string): Observable<T> {
    const url = `${apiUrl}/${entityUrl}/${id}`;
    return this.http.delete<T>(url, httpOptions).pipe(
      tap(() => console.log(`deleted item id=${id}`)),
      catchError(this.handleError<T>(`delete ${entityUrl}`))
    );
  }

  deleteAll<T>(entityUrl:string): Observable<T[]> {
    return this.http.delete<T[]>(`${apiUrl}/${entityUrl}s`).pipe(
      tap(() => console.log('deleted all ${entityUrl}s')),
      catchError(this.handleError('delete all ${entityUrl}s', []))
    );
  }
}
