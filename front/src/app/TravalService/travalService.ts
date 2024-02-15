import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/destinations/top';

  constructor(private http: HttpClient) {}

  sendTravelPreferences(userPreference: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl, userPreference, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error sending travel preferences:', error);
          return throwError('Something went wrong with the request.');
        })
      );
  }
}
