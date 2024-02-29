import { Component, OnInit } from '@angular/core';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css',
})
export class DestinationComponent implements OnInit {
  destination: DestinationCard = {} as DestinationCard;
  trueDocumentKeys: string[] = [];

  constructor() {}

  ngOnInit() {
    if (history.state.data) {
      this.destination = history.state.data;
      this.trueDocumentKeys = this.getTrueDocuments();
    }
  }

  getTrueDocuments(): string[] {
    if (!this.destination.documents) {
      return [];
    }

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
