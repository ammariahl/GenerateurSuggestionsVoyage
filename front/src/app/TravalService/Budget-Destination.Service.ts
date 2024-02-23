import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
import { DestinationCard } from '../models/destination-card.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BudgetDestinationService {
  private apiUrl =
    'http://localhost:8080/api/destionations/first3budgetdestinations';

  constructor(private http: HttpClient) {}

  getFirstThreeBudgetDestinations(): Observable<DestinationCard[]> {
    const headers = new HttpHeaders();

    return this.http
      .get<DestinationCard[]>(this.apiUrl, { headers, withCredentials: true })
      .pipe(
        tap((response) => {
          console.log('Success response budget destinations:', response);
        }),

        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error(
              'An error occurred on the client:',
              error.error.message
            );
          } else {
            // Server-side error
            console.error(
              `Backend returned code ${error.status}, body was:`,
              error.error
            );
          }
          return throwError('Something went wrong with the request.');
        })
      );
  }
}
