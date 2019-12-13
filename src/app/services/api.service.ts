import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:5000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAll<T>(modelName: string): Observable<T[]> {
    const url = `${this.apiUrl}/${modelName}s`;

    return this.http.get<T[]>(url).pipe(
      tap(() => console.log(`fetched ${modelName}s`)),
      catchError(this.handleError([]))
    );
  }

  get<T>(id: any, modelName: string): Observable<T> {
    const url = `${this.apiUrl}/${modelName}s/${id}`;

    return this.http.get<T>(url).pipe(
      tap(_ => console.log(`fetched ${modelName} id=${id}`)),
      catchError(this.handleError<T>())
    );
  }

  add<T>(entity: T, modelName: string): Observable<T> {
    const url = `${this.apiUrl}/${modelName}s/add`;

    return this.http.post<T>(url, entity, this.httpOptions).pipe(
      tap(() => console.log(`added ${modelName}`)),
      catchError(this.handleError<T>())
    );
  }

  update<T>(id: any, entity: T, modelName: string): Observable<any> {
    const url = `${this.apiUrl}/${modelName}s/${id}/update`;

    return this.http.put(url, entity, this.httpOptions).pipe(
      tap(() => console.log(`updated ${modelName} id=${id}`)),
      catchError(this.handleError<T>())
    );
  }

  delete<T>(id: any, modelName: string): Observable<T> {
    const url = `${this.apiUrl}/${modelName}s/${id}/delete`;

    return this.http.delete<T>(url, this.httpOptions).pipe(
      tap(() => console.log(`deleted ${modelName} id=${id}`)),
      catchError(this.handleError<T>())
    );
  }

  deleteAll<T>(modelName: string): Observable<T[]> {
    const url = `${this.apiUrl}/${modelName}s/delete`;

    return this.http.delete<T[]>(url).pipe(
      tap(() => console.log(`deleted all ${modelName}s`)),
      catchError(this.handleError([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log to console instead
      return of(result as T);
    };
  }
}
