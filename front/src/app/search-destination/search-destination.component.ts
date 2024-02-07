import { Component, OnInit } from '@angular/core';

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
      console.log('--- un bouton a été appelé');
      console.log('avant :');
      console.log(this.documents);
      if (!this.documents.includes(preference)) {
        console.log('nouvel element');
        this.documents.push(preference);
        console.log('apres le push :');
        console.log(this.documents);
        if (this.documents[0] == '') {
          this.documents.shift();
          console.log('apres supp du singleton :');
          console.log(this.documents);
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
  }
}
