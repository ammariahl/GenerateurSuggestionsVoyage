import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  }

  private getDestinationsFromLocalStorage(): DestinationCard[] {
    const destinations = localStorage.getItem('destinations');
    return destinations ? JSON.parse(destinations) : [];
  }
}
