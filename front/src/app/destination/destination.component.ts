import { Component, OnInit } from '@angular/core';
import { SharedDestinationService } from '../TravalService/Shared-destination.service';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css',
})
export class DestinationComponent implements OnInit {
  destination: DestinationCard = {} as DestinationCard;

  constructor(private sharedDestination: SharedDestinationService) {}

  ngOnInit() {
    this.destination = history.state.data;
    console.log('Destination:', this.destination);
    //console.log('Documents:', this.destination.documents);
    this.getTrueDocuments();
  }

  getTrueDocuments() {
    const trueDocumentKeys = this.destination.documents.flatMap(
      (document: any) => {
        return Object.keys(document).filter(
          (key: keyof typeof document) => document[key] === true
        );
      }
    );
    return trueDocumentKeys;
  }
}
