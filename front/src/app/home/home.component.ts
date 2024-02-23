import { Component, OnInit, NgZone } from '@angular/core';
import { FamillyDestinationService } from '../TravalService/Familly-Destination.Service';
import { SpringDestinationService } from '../TravalService/Spring-Destination.Service';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  familydestinations: DestinationCard[] = [];
  springdestinations: DestinationCard[] = [];

  constructor(
    private famillyDestinationService: FamillyDestinationService,
    private springDestinationService: SpringDestinationService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadFirstThreeFamilyDestinations();
    this.loadFirstThreeSpringDestinations();
  }
  loadFirstThreeFamilyDestinations() {
    this.famillyDestinationService.getFirstThreeFamilyDestinations().subscribe(
      (response: DestinationCard[]) => {
        this.zone.run(() => {
          this.familydestinations = response;
          console.log(
            'First three family destinations:',
            this.familydestinations
          );
        });
      },
      (error) => {
        console.error('Error loading first three family destinations:', error);
      }
    );
  }

  loadFirstThreeSpringDestinations() {
    this.springDestinationService.getFirstThreeSpringDestinations().subscribe(
      (response: DestinationCard[]) => {
        this.zone.run(() => {
          this.springdestinations = response;
          console.log(
            'First three family destinations:',
            this.springdestinations
          );
        });
      },
      (error) => {
        console.error('Error loading first three family destinations:', error);
      }
    );
  }
}
