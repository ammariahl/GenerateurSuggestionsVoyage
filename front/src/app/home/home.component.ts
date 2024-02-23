import { Component, OnInit, NgZone } from '@angular/core';
import { FamillyDestinationService } from '../TravalService/Familly-Destination.Service';
import { SpringDestinationService } from '../TravalService/Spring-Destination.Service';
import { BudgetDestinationService } from '../TravalService/Budget-Destination.Service';
import { DestinationCard } from '../models/destination-card.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  familydestinations: DestinationCard[] = [];
  springdestinations: DestinationCard[] = [];
  budgetdestinations: DestinationCard[] = [];

  constructor(
    private famillyDestinationService: FamillyDestinationService,
    private springDestinationService: SpringDestinationService,
    private budgetDestinationService: BudgetDestinationService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadFirstThreeFamilyDestinations();
    this.loadFirstThreeSpringDestinations();
    this.loadFirstThreeBudgetDestinations();
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

  loadFirstThreeBudgetDestinations() {
    this.budgetDestinationService.getFirstThreeBudgetDestinations().subscribe(
      (response: DestinationCard[]) => {
        this.zone.run(() => {
          this.budgetdestinations = response;
          console.log(
            'First three budget destinations:',
            this.budgetdestinations
          );
        });
      },
      (error) => {
        console.error('Error loading first three budget destinations:', error);
      }
    );
  }
}
