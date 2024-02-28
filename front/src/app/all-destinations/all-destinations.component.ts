import { Component } from '@angular/core';
import { AllDestinationsService } from '../all-destinations.service';
import { DestinationCard } from '../models/destination-card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-destinations',
  templateUrl: './all-destinations.component.html',
  styleUrl: './all-destinations.component.css',
})
export class AllDestinationsComponent {
  destinations: DestinationCard[] = [];

  constructor(
    private allDestinations: AllDestinationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayDestinations();
  }

  displayDestinations(): void {
    this.allDestinations.getAllDestinations().subscribe((data: any) => {
      this.destinations = data;
    });
  }

  navigateToDestination(destination: DestinationCard): void {
    this.router.navigate(['/destination', destination.name], {
      state: { data: destination },
    });
  }
}
