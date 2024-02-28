import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllDestinationsService {
  private baseUrl = 'http://localhost:8080/api/destinations';

  constructor(private http: HttpClient) {}

  getAllDestinations(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }
}
