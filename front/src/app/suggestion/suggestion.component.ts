import { Component } from '@angular/core';
import { DestinationCard } from '../models/destination-card.model';
import { TravelService } from '../TravalService/travalService';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css',
})
export class SuggestionComponent {
  /*
  destinationCard: DestinationCard[] = [
    {
      name: 'Espagne',
      image: '/assets/img/espagne.jpg',
      periode: 'Ete',
      budget: '500e',
      climat: 'Chaud',
      activity: 'relax',
      documents: ['CNI UE', 'Passeport UE'],
      briefDescription: 'Pays européen',
    },
    {
      name: 'Corée du Sud',
      image: '/assets/img/coree-du-sud.jpg',
      periode: 'Ete',
      budget: '1500e',
      climat: 'Chaud',
      activity: 'relax',
      documents: ['Passeport'],
      briefDescription: 'Pays asiatique',
    },
    {
      name: 'Mexique',
      image: '/assets/img/mexique.jpg',
      periode: 'Ete',
      budget: '1500e',
      climat: 'Chaud',
      activity: 'adventure',
      documents: ['Passeport'],
      briefDescription: "Pays d'Amérique du Sud",
    },
    {
      name: 'Norvege',
      image: '/assets/img/norvege.jpg',
      periode: 'Hivers',
      budget: '500e',
      climat: 'Froid',
      activity: 'adventure',
      documents: ['CNI UE', 'Passeport UE'],
      briefDescription: 'Pays européen',
    },
    {
      name: 'Afrique du Sud',
      image: '/assets/img/afrique-du-sud.jpeg',
      periode: 'Ete',
      budget: '1500e',
      climat: 'Chaud',
      activity: 'relax',
      documents: ['Passeport'],
      briefDescription: 'Pays africain',
    },
  ];*/
  isViewAll: Boolean = false;
  forOption: string = '';
  destinationCard: DestinationCard[] = [];

  constructor(private travelService: TravelService) {}

  getTopDestinations(userSelections: DestinationCard): void {
    this.travelService.sendTravelPreferences(userSelections).subscribe(
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

  viewAll(): void {
    this.isViewAll = !this.isViewAll;
  }
}
