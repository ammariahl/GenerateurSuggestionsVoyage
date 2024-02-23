import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedDestinationService } from '../TravalService/Shared-destination.service';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  winterDestinations: DestinationCard[] = [];
  familyDestinations: string[] = ['1', '2', '3'];
  adventureDestinations: string[] = ['1', '2', '3'];

  constructor(
    private cdr: ChangeDetectorRef,
    private sharedDestinationService: SharedDestinationService
  ) {}

  ngAfterViewInit(): void {
    // Subscribe to the destinations$ observable when the component initializes
    this.sharedDestinationService.destinations$.subscribe(
      (destinations) => {
        console.log('Received destinations from shared service:', destinations);
        destinations.forEach((destination) => {
          const selectedSeasons = destination.seasons;
          const selectedBudgets = destination.budgets;
          const selectedActivities = destination.activities;
          const selectedDocuments = destination.documents;
          // Accessing seasons
          console.log(
            'Seasons for destination',
            destination.name,
            ':',
            selectedSeasons
          );

          // Accessing budgets
          console.log(
            'Budgets for destination',
            destination.name,
            ':',
            selectedBudgets
          );

          // Accessing activities
          console.log(
            'Activities for destination',
            destination.name,
            ':',
            selectedActivities
          );

          // Accessing documents
          console.log(
            'Documents for destination',
            destination.name,
            ':',
            selectedDocuments
          );
        });
        this.winterDestinations = destinations;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error getting destinations:', error);
        console.log('No matching destinations:');
      }
    );
  }

  showDestinationCard(destination: DestinationCard): void {}
}
