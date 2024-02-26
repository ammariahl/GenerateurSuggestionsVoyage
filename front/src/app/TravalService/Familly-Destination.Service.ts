import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, filter, map } from 'rxjs/operators';
import { DestinationCard } from '../models/destination-card.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FamillyDestinationService {
  private apiUrl =
    'http://localhost:8080/api/destinations/first3familydestinations';

  constructor(private http: HttpClient) {}

  getFirstThreeFamilyDestinations(): Observable<DestinationCard[]> {
    const headers = new HttpHeaders();

    return this.http
      .get<any[]>(this.apiUrl, { headers, withCredentials: true })
      .pipe(
        map((response) => response.filter((item) => typeof item === 'object')),
        tap((response) => {
          console.log('Success response family:', response);
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
