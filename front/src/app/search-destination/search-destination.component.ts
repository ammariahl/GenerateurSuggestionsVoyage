import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
})
export class SearchDestinationComponent implements OnInit {
  // Preference selected
  periode: string = '';
  climat: string = '';
  budget: string = '';
  activity: string = '';
  documents: Array<string> = [''];

  // Preference selected  displayed on timeline
  periodeTimeline: string = '';
  climatTimeline: string = '';
  budgetTimeline: string = '';
  activityTimeline: string = '';

  isSend: boolean = false;
  questionNumber: number = 1;

  // Equivalence preference button and db
  periodeArray: Array<string> = ['spring', 'summer', 'autumn', 'winter'];
  climatArray: Array<string> = ['chaud', 'froid', 'doux', 'peu_importe'];
  budgetArray: Array<string> = [
    'little_budget',
    'medium_budget',
    'big_budget',
    'unlimited',
  ];
  activitiesArray: Array<string> = [
    'relaxing',
    'adventure',
    'groupactivity',
    'family',
  ];
  documentsArray: Array<string> = [
    'cni_ue',
    'passport_ue',
    'visa_ue',
    'passport_mde',
  ];
  periodeButtomName: Array<string> = ['Printemps', 'Ete', 'Automne', 'Hivers'];
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  preferencesSelection(preference: string): void {
    if (this.periodeArray.includes(preference)) {
      this.questionNumber = 2;
      this.periode = preference;
      this.periodeTimeline =
        this.periodeButtomName[this.periodeArray.indexOf(preference)];
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
      }
    }
  }

  previous(step: number): void {
    if (step < this.questionNumber) {
      this.questionNumber = step;
      if (step < 2) {
        this.periode = '';
        this.periodeTimeline = '';
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
    console.log('Selection soumise avec succès : ');
    console.log(this.isSend);

    console.log(this.periode);
    console.log(this.climat);
    console.log(this.budget);
    console.log(this.activity);
    console.log(this.documents);
    this.router.navigate([
      '/suggestion',
      this.periode,
      this.climat,
      this.budget,
      this.activity,
      this.documents.join('**'),
    ]);
  }
}
