import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TravelService } from '../TravalService/travalService';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
})
export class SearchDestinationComponent implements OnInit {
  season: string = '';
  climat: string = '';
  budget: string = '';
  activity: string = '';
  documents: Array<string> = [''];
  isSend: boolean = false;
  isClimatSend: boolean = false;
  isSeasonSend: boolean = false;
  isBudgetSend: boolean = false;
  isActivitySend: boolean = false;
  isDocumentSend: boolean = false;
  climatArray: Array<string> = ['chaud', 'froid', 'doux', 'peuimporte'];
  seasonArray: Array<string> = ['spring', 'autumn', 'summer', 'winter'];
  budgetArray: Array<string> = [
    'littleBbudget',
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
  preferences: any = {
    seasons: [],
    budgets: [],
    activities: [],
    documents: [],
  };
  constructor(
    private travelService: TravelService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  preferencesSelection(preference: string): void {
    if (this.seasonArray.includes(preference)) {
      this.isSeasonSend = true;
      this.season = preference;
    } else if (this.climatArray.includes(preference)) {
      this.isSeasonSend = false;
      this.isClimatSend = true;
      this.climat = preference;
    } else if (this.budgetArray.includes(preference)) {
      this.isClimatSend = false;
      this.isSeasonSend = false;
      this.isBudgetSend = true;
      this.budget = preference;
    } else if (this.activitiesArray.includes(preference)) {
      this.isClimatSend = false;
      this.isSeasonSend = false;
      this.isBudgetSend = false;
      this.isActivitySend = true;
      this.activity = preference;
    } else if (this.documentsArray.includes(preference)) {
      if (!this.documents.includes(preference)) {
        this.documents.push(preference);
        if (this.documents[0] == '') {
          this.documents.shift();
        }
      }
    }
    this.cdr.detectChanges();
  }

  sendSearchDestinationForm(): void {
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

    console.log(JSON.stringify(preferences, null, 2));

    this.travelService.sendTravelPreferences(preferences).subscribe(
      (response) => {
        console.log('Response from backend:', response);
      },
      (error) => {
        console.error('Error sending preferences:', error);
      }
    );
  }
}
