import { Component, ChangeDetectorRef } from '@angular/core';
import { TravelService } from '../TravalService/travalService';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DestinationCard } from '../models/destination-card.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ transform: 'translateY(-100%)', zIndex: -1 }),
        animate(
          '0.5s ease-in',
          style({ transform: 'translateY(0)', zIndex: -1 })
        ),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        style({ zIndex: -1 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(-100%)', zIndex: -1 })
        ),
      ]),
    ]),
  ],
})
export class SearchDestinationComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private travelService: TravelService,
    private cdr: ChangeDetectorRef
  ) {}

  // J'initialise le compteur
  currentStep = 0;

  // Je déclare les variables
  destination: DestinationCard[] = [];
  userPreference: any = {
    season: [],
    climat: [],
    budget: [],
    activity: [],
    documents: [],
  };
  //stepCompleted: { [key: number]: boolean } = { 0: true };
  stepValues: { [key: number]: string } = {};
  valueNames: { [key: string]: string } = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver',
    chaud: 'Chaud',
    froid: 'Froid',
    doux: 'Doux',
    peu_importe: 'Peu importe',
    littleBudget: 'Petit budget',
    mediumBudget: 'Budget moyen',
    bigBudget: 'Gros budget',
    unlimited: 'Illimité',
    relaxing: 'Relaxant',
    adventure: 'Aventure',
    groupactivity: 'Activité de groupe',
    family: 'Famille',
    cniUe: "Carte d'identité",
    passportUE: 'Passeport UE',
    visaUE: 'Visa UE',
    passportMde: 'Passeport Monde',
  };

  // Je crée le formulaire
  preferencesForm = this.formBuilder.group({
    season: ['', Validators.required],
    climat: ['', Validators.required],
    budget: ['', Validators.required],
    activity: ['', Validators.required],
    documents: this.formBuilder.array([], Validators.required),
  });

  //Je crée un objet pour stocker les documents sélectionnés
  selectedDocuments: { [key: string]: boolean } = {
    cniUe: false,
    passportUe: false,
    visaUe: false,
    passportMde: false,
  };

  // Je met à jour le compteur pour savoir où je suis dans le formulaire
  onButtonClick(step: number): void {
    if (step > this.currentStep) {
      this.currentStep = step;
      this.cdr.detectChanges();
    } else {
      this.currentStep = step - 1;
      this.cdr.detectChanges();
    }
  }

  //Je récupère les infos des boutons cliqués
  setPreference(field: string, value: string, step: number): void {
    this.preferencesForm.get(field)?.setValue(value);

    const valueName = this.valueNames[value];

    this.stepValues[step] = valueName;
    this.onButtonClick(step);
    this.cdr.detectChanges();
  }

  //Je fais en sorte qu'on puisse sélectionner plusieurs documents
  onDocumentSelect(document: any): void {
    const documents = this.preferencesForm.get('documents') as FormArray;
    const documentObject = {
      cniUe: document === 'cniUe',
      passportUe: document === 'passportUe',
      visaUe: document === 'visaUe',
      passportMde: document === 'passportMde',
    };
    documents.push(this.formBuilder.control(documentObject));
    this.selectedDocuments[document] = !this.selectedDocuments[document];
  }

  atLeastOneDocumentSelected(): boolean {
    return Object.values(this.selectedDocuments).some((value) => value);
  }

  //Je navigue vers la page de suggestions de destinations
  navigateToSuggestion(): void {
    this.travelService
      .sendTravelPreferences(this.userPreference)
      .pipe(
        catchError((error) => {
          this.router.navigate(['/destNotFound']);
          console.log('Error:', error);
          return of([]);
        })
      )
      .subscribe((response) => {
        if (response !== null && response.length > 0) {
          const urlDocument: string[] = Object.keys(
            this.selectedDocuments
          ).filter((key) => this.selectedDocuments[key]);

          const url = `api/destinations/top/${this.userPreference.season}/${
            this.userPreference.climat
          }/${this.userPreference.budget}/${
            this.userPreference.activity
          }/${urlDocument.join('**')}`;

          this.router.navigate([url]);
        } else {
          this.router.navigate(['/destNotFound']);
        }
      });
  }

  //Quand le formulaire est soumis, je récupère les infos et je les envoie à la page de suggestions de destinations
  onSubmit(): void {
    this.userPreference.season.push(this.preferencesForm.value.season);
    this.userPreference.climat.push(this.preferencesForm.value.climat);
    this.userPreference.budget.push(this.preferencesForm.value.budget);
    this.userPreference.activity.push(this.preferencesForm.value.activity);
    const documentsControl = this.preferencesForm.get('documents');
    if (documentsControl) {
      const selectedDocuments = documentsControl.value;
      for (let document of selectedDocuments) {
        this.userPreference.documents.push(document);
      }
    }
    this.navigateToSuggestion();
  }

  // Animations
  ngAfterViewChecked(): void {
    this.scrollToCurrentStep();
  }

  scrollToCurrentStep(): void {
    const stepElements = Array.from(document.querySelectorAll('.step'));
    const visibleStepElements = stepElements.filter(
      (step) => (step as HTMLElement).offsetParent !== null
    );
    const lastVisibleStepElement =
      visibleStepElements[visibleStepElements.length - 1];
    if (lastVisibleStepElement) {
      lastVisibleStepElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
