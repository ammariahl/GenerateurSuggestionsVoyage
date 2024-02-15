import { Component } from '@angular/core';
import { DestinationCard } from '../models/destination-card.model';
import { TravelService } from '../TravalService/travalService';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent {
  destinationCard: DestinationCard[] = [];
  isViewAll: boolean = false;

  constructor(private travelService: TravelService) {}

  getTopDestinations(userPreference: any): void {
    this.travelService.sendTravelPreferences(userPreference).subscribe(
      (response) => {
        console.log('Received destinations:', response);
        this.destinationCard = response as DestinationCard[];
      },
      (error) => {
        console.error('Error getting destinations:', error);
        console.log('No matching destinations:');
      }
    );
  }

  showDestinationCard(destination: DestinationCard): void {
    console.log('Selected destination:', destination);
  }

  toggleViewAll(): void {
    this.isViewAll = !this.isViewAll;
  }
}
