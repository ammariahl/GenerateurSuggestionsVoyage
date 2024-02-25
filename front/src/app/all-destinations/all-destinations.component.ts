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
  constructor(
    private allDestinations: AllDestinationsService,
    private router: Router
  ) {}

  destinations: DestinationCard[] = [];

  displayDestinations() {
    this.allDestinations.getAllDestinations().subscribe((data: any) => {
      this.destinations = data;
    });
  }

  navigateToDestination(destination: DestinationCard) {
    this.router.navigate(['/destination', destination.name], {
      state: { data: destination },
    });
  }
  ngOnInit(): void {
    this.displayDestinations();
  }
}
