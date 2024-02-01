import { Component, OnInit } from '@angular/core';
import { DestinationCriteria } from '../models/destination-criteria.model';

@Component({
  selector: 'app-search-destination',
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css',
})
export class SearchDestinationComponent implements OnInit {
  isSend: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  preferencesSelection(preference: string): void {}

  sendSearchDestinationForm(): void {
    this.isSend = true;
    // Selection submitted
    console.log('Selection soumise avec succès : ');
    console.log(this.isSend);
  }
}
