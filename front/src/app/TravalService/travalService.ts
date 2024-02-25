import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SharedDestinationService } from './Shared-destination.service';
import { DestinationCard } from '../models/destination-card.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/destinations/top';

  constructor(
    private http: HttpClient,
    private sharedDestinationService: SharedDestinationService
  ) {}
  sendTravelPreferences(userPreference: any): Observable<any> {
    console.log('Sending user preference:', userPreference);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl, userPreference, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response: DestinationCard[]) => {
          console.log('Success response:', response);
          this.sharedDestinationService.setDestinations(response);
        }) as any,
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
