import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from '../TravalService/travalService';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  isMenuOpen = false;
  budgets: Array<string> = [
    'littleBudget',
    'mediumBudget',
    'bigBudget',
    'unlimited',
  ];
  activities: Array<string> = [
    'relaxing',
    'adventure',
    'groupactivity',
    'family',
  ];
  documents: Array<string> = ['cniUe', 'passportUe', 'visaUe', 'passportMde'];

  constructor(
    private router: Router,
    private travelService: TravelService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleIsRandomTrue(): void {
    this.travelService.isRandom = true;
    console.log("Random = True");
  }

  toggleIsRandomFalse(): void {
    this.travelService.isRandom = false;
    console.log("Random = false");
  }
  sendSearchDestinationForm(): void {
    // Selection submitted
    const preferences = {
      seasons: [{ ['winter']: 'froid' }],
      budgets: this.budgets.reduce((acc, doc) => {
        if (doc.trim() !== '') {
          acc.push({ [doc.replace(/ /g, '')]: true });
        }
        return acc;
      }, [] as { [key: string]: boolean }[]),
      documents: this.documents.reduce((acc, doc) => {
        if (doc.trim() !== '') {
          acc.push({ [doc.replace(/ /g, '')]: true });
        }
        return acc;
      }, [] as { [key: string]: boolean }[]),
      activities: this.activities.reduce((acc, doc) => {
        if (doc.trim() !== '') {
          acc.push({ [doc.replace(/ /g, '')]: true });
        }
        return acc;
      }, [] as { [key: string]: boolean }[]),
    };

    const userPreference = JSON.stringify(preferences);
    // console.log(JSON.stringify(preferences));
    console.log('User Preference:', userPreference);
    this.travelService
      .sendTravelPreferences(userPreference)
      .pipe(
        catchError((error) => {
          console.error('Error sending preferences:', error);
          // Handle the error or rethrow it as needed
          return of(null); // or throw error;
        })
      )
      .subscribe((response) => {
        if (response !== null) {
          console.log('Response from backend:', response);
          console.log('Data from response:', response);
        }
      });
  }
}
