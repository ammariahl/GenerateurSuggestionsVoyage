import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DestinationCard } from '../models/destination-card.model';
import { TravelService } from '../TravalService/travalService';
import { SharedDestinationService } from '../TravalService/Shared-destination.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css'],
})
export class SuggestionComponent implements AfterViewInit {
  destinationCard: DestinationCard[] = [];
  isViewAll: boolean = false;

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
        this.destinationCard = destinations;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error getting destinations:', error);
        console.log('No matching destinations:');
      }
    );
  }

  showDestinationCard(destination: DestinationCard): void {
    // console.log('show destination card in suggestion component:', destination);
    // // Access the properties of the selected destinationCard
    // console.log('Selected Season:', destination.selectedSeason);
    // console.log('Selected Budget:', destination.selectedBudget);
    // console.log('Selected Activity:', destination.selectedActivity);
    // console.log(
    //   'Selected Documents:',
    //   destination.selectedDocuments.join(', ')
    // );
  }

  viewAll(): void {
    this.isViewAll = !this.isViewAll;
  }
  getSelectedSeason(destination: DestinationCard): string {
    const seasons = destination.seasons;

    if (seasons && seasons.length > 0) {
      const firstSeason: any = seasons[0];
      const seasonMap: { [key: string]: string } = {
        winter: 'Hivers',
        spring: 'Printemps',
        summer: 'Eté',
        autumn: 'Automne',
      };

      for (const key in firstSeason) {
        if (
          Object.prototype.hasOwnProperty.call(firstSeason, key) &&
          key !== 'id' &&
          firstSeason[key] !== '0'
        ) {
          const frenchSeason = seasonMap[key] || key;
          return `${frenchSeason} -  ${firstSeason[key]}`;
        }
      }
    }

    return '';
  }

  getSelectedBudget(destination: DestinationCard): string {
    const selectedBudgets = destination.budgets;
    if (selectedBudgets && selectedBudgets.length > 0) {
      const selectedBudget = selectedBudgets[0];
      if (selectedBudget.littleBudget) {
        return '500€';
      } else if (selectedBudget.mediumBudget) {
        return '1000€';
      } else if (selectedBudget.bigBudget) {
        return ' 1500€';
      } else if (selectedBudget.unlimited) {
        return 'Unlimited Budget';
      }
    }

    return 'No budget selected';
  }

  getSelectedDocument(destination: DestinationCard): string {
    const documents = destination.documents;

    if (documents && documents.length > 0) {
      const firstDocument: any = documents[0];
      const documentMap: { [key: string]: string } = {
        cniUe: "Carte d'identité",
        passportUe: 'Passeport (UE)',
        visaUe: 'Visa (UE)',
        passportMde: 'Passeport (Monde)',
      };

      for (const key in firstDocument) {
        if (
          Object.prototype.hasOwnProperty.call(firstDocument, key) &&
          key !== 'id' &&
          firstDocument[key]
        ) {
          const frenchDocument = documentMap[key] || key;
          return `${frenchDocument}`;
        }
      }
    }

    return 'No document selected';
  }
}
