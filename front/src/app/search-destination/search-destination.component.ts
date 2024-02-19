import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TravelService } from '../TravalService/travalService';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
})
export class SearchDestinationComponent implements OnInit {
  // Preference selected
  season: string = '';
  climat: string = '';
  budget: string = '';
  activity: string = '';
  documents: Array<string> = [''];

  // Preference selected  displayed on timeline
  seasonTimeline: string = '';
  climatTimeline: string = '';
  budgetTimeline: string = '';
  activityTimeline: string = '';

  isSend: boolean = false;
  questionNumber: number = 1;
  cniUeSelected: boolean = false;
  passeportUeSelected: boolean = false;
  visaUeSelected: boolean = false;
  passeportMdeSelected: boolean = false;

  // Equivalence preference button and db
  seasonArray: Array<string> = ['spring', 'summer', 'autumn', 'winter'];
  climatArray: Array<string> = ['chaud', 'froid', 'doux', 'peu_importe'];
  budgetArray: Array<string> = [
    'littleBudget',
    'mediumBudget',
    'bigBudget',
    'unlimited',
  ];
  activitiesArray: Array<string> = [
    'relaxing',
    'adventure',
    'groupactivity',
    'family',
  ];
  documentsArray: Array<string> = [
    'cniUe',
    'passeportUe',
    'visaUe',
    'passeportMde',
  ];
  seasonButtomName: Array<string> = ['Printemps', 'Ete', 'Automne', 'Hivers'];
  climatButtomName: Array<string> = ['Chaud', 'Froid', 'Doux', 'Peu importe'];
  budgetButtomName: Array<string> = ['500 €', '1000 €', '1500 €', 'No limit !'];
  activitiesButtomName: Array<string> = [
    'Pour me relaxer',
    "Pour l'aventure",
    'Entre amis',
    'En famille',
  ];
  documentsButtomName: Array<string> = [
    "Carte d'identité UE",
    'Passeport UE',
    'Visa UE',
    'Passeport Monde',
  ];
  preferences: any = {
    seasons: [],
    budgets: [],
    activities: [],
    documents: [],
  };

  constructor(
    private router: Router,
    private travelService: TravelService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  preferencesSelection(preference: string): void {
    if (this.seasonArray.includes(preference)) {
      this.questionNumber = 2;
      this.season = preference;
      this.seasonTimeline =
        this.seasonButtomName[this.seasonArray.indexOf(preference)];
    } else if (this.climatArray.includes(preference)) {
      this.questionNumber = 3;
      this.climat = preference;
      this.climatTimeline =
        this.climatButtomName[this.climatArray.indexOf(preference)];
    } else if (this.budgetArray.includes(preference)) {
      this.questionNumber = 4;
      this.budget = preference;
      this.budgetTimeline =
        this.budgetButtomName[this.budgetArray.indexOf(preference)];
    } else if (this.activitiesArray.includes(preference)) {
      this.questionNumber = 5;
      this.activity = preference;
      this.activityTimeline =
        this.activitiesButtomName[this.activitiesArray.indexOf(preference)];
    } else if (this.documentsArray.includes(preference)) {
      if (!this.documents.includes(preference)) {
        this.documents.push(preference);
        if (this.documents[0] == '') {
          this.documents.shift();
        }
      } else {
        const i = this.documents.indexOf(preference);
        this.documents.splice(i, 1);
      }

      if (preference == 'cniUe') {
        this.cniUeSelected = !this.cniUeSelected;
      }
      if (preference == 'passeportUe') {
        this.passeportUeSelected = !this.passeportUeSelected;
      }
      if (preference == 'visaUe') {
        this.visaUeSelected = !this.visaUeSelected;
      }
      if (preference == 'passeportMde') {
        this.passeportMdeSelected = !this.passeportMdeSelected;
      }
    }
    this.cdr.detectChanges();
  }

  previous(step: number): void {
    if (step < this.questionNumber) {
      this.questionNumber = step;
      if (step < 2) {
        this.season = '';
        this.seasonTimeline = '';
      }
      if (step < 3) {
        this.climat = '';
        this.climatTimeline = '';
      }
      if (step < 4) {
        this.budget = '';
        this.budgetTimeline = '';
      }
      if (step < 5) {
        this.activity = '';
        this.activityTimeline = '';
        this.documents = [''];
      }
    }
  }

  sendSearchDestinationForm(): void {
    this.isSend = true;

    // Selection submitted
    const preferences = {
      seasons: [{ [this.season.toLowerCase()]: this.climat }],
      budgets: [{ [this.budget]: true }],
      activities: [{ [this.activity.toLowerCase()]: true }],
      documents: this.documents.reduce((acc, doc) => {
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

    this.router.navigate([
      '/api/destinations/top',
      this.season,
      this.climat,
      this.budget,
      this.activity,
      this.documents.join('**'),
    ]);
  }
}
