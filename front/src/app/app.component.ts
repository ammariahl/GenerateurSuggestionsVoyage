import { Component } from '@angular/core';
import { DestinationCard } from './models/destination-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front';
  design_image: string = '/assets/img/maquette_image_gauche.PNG';
  logo_image: string = '/assets/img/maquette_logo.PNG';
  isGoToForm: Boolean = false;
  selectedDestination: DestinationCard | null = null;
  isSend: boolean = false;

  // preferencesSelection(selection: string, category: string): void {
  //   // Check if selectedDestination is null, and initialize it if necessary
  //   if (this.selectedDestination === null) {
  //     this.selectedDestination = {
  //       image: '',
  //       name: '',
  //       season: '',
  //       budget: '',
  //       // climat: '',
  //       activity: '',
  //       documents: [],
  //       briefDescription: '',
  //     };
  //   }

  //   // Update the properties of the selectedDestination based on the selected category and value
  //   switch (category) {
  //     case 'periode':
  //       this.selectedDestination.season = selection;
  //       break;
  //     // case 'climat':
  //     //   this.selectedDestination.climat = selection;
  //     //   break;
  //     case 'season':
  //       this.selectedDestination.season = selection;
  //       break;
  //     case 'budget':
  //       this.selectedDestination.budget = selection;
  //       break;
  //     case 'activity':
  //       this.selectedDestination.activity = selection;
  //       break;
  //     case 'documents':
  //       if (!this.selectedDestination.documents) {
  //         this.selectedDestination.documents = [];
  //       }
  //       this.selectedDestination.documents.push(selection);
  //       break;
  //   }
  // }

  goToSearch(): void {
    if (this.isGoToForm) {
      this.isGoToForm = false;
    } else {
      this.isGoToForm = true;
    }
  }
}
