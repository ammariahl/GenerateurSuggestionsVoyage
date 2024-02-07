import { Component } from '@angular/core';

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

  goToSearch(): void {
    if (this.isGoToForm) {
      this.isGoToForm = false;
    } else {
      this.isGoToForm = true;
    }
  }
}
