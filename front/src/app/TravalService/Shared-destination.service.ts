import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DestinationCard } from '../models/destination-card.model';

@Injectable({
  providedIn: 'root',
})
export class SharedDestinationService {
  private destinationsSubject = new BehaviorSubject<DestinationCard[]>(
    this.getDestinationsFromLocalStorage()
  );
  destinations$ = this.destinationsSubject.asObservable();

  setDestinations(destinations: DestinationCard[]): void {
    this.destinationsSubject.next(destinations);
    localStorage.setItem('destinations', JSON.stringify(destinations));
    console.log('Destinations in shared service:', destinations);
  }

  private getDestinationsFromLocalStorage(): DestinationCard[] {
    const destinations = localStorage.getItem('destinations');
    return destinations ? JSON.parse(destinations) : [];
  }
}
