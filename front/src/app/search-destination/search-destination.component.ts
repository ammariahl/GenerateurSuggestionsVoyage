import { Component, OnInit } from '@angular/core';
import { DestinationCriteria } from '../models/destination-criteria.model';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
})
export class SearchDestinationComponent implements OnInit {
  periode: string = '';
  climat: string = '';
  budget: string = '';
  activity: string = '';
  documents: Array<string> = [''];
  isSend: boolean = false;
  isPeriodeSend: boolean = false;
  isClimatSend: boolean = false;
  isBudgetSend: boolean = false;
  isActivitySend: boolean = false;
  isDocumentSend: boolean = false;
  periodeArray: Array<string> = ['hivers', 'printemps', 'ete', 'automne'];
  climatArray: Array<string> = ['chaud', 'froid', 'doux', 'peu importe'];
  budgetArray: Array<string> = ['500', '1000', '1500', 'no limit'];
  activitiesArray: Array<string> = ['relaxer', 'aventure', 'amis', 'famille'];
  documentsArray: Array<string> = [
    'cni ue',
    'passeport ue',
    'visa ue',
    'passeport mde',
  ];

  constructor() {}

  ngOnInit(): void {}

  preferencesSelection(preference: string): void {
    if (this.periodeArray.includes(preference)) {
      this.isPeriodeSend = true;
      this.periode = preference;
    } else if (this.climatArray.includes(preference)) {
      this.isPeriodeSend = false;
      this.isClimatSend = true;
      this.climat = preference;
    } else if (this.budgetArray.includes(preference)) {
      this.isPeriodeSend = false;
      this.isClimatSend = false;
      this.isBudgetSend = true;
      this.budget = preference;
    } else if (this.activitiesArray.includes(preference)) {
      this.isPeriodeSend = false;
      this.isClimatSend = false;
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
  }

  sendSearchDestinationForm(): void {
    this.isSend = true;
    // Selection submitted
    console.log('Selection soumise avec succès : ');
    console.log(this.isSend);

    console.log(this.periode);
    console.log(this.climat);
    console.log(this.budget);
    console.log(this.activity);
    console.log(this.documents);
  }
}
