import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DestinationCard } from '../models/destination-card.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/destinations/top';

  constructor(private http: HttpClient) {}

  sendTravelPreferences(preferences: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl, preferences, {
        headers,
        withCredentials: true,
      })
      .pipe(
        catchError((error: any) => {
          console.error('Error sending travel preferences:', error);
          throw error;
        })
      );
  }
}
