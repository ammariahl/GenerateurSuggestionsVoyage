import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SharedDestinationService } from './Shared-destination.service';
import { DestinationCard } from '../models/destination-card.model';
//import { UserPreference } from '../models/userPreferences.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/destinations/top';
  private randomUrl = 'http://localhost:8080/api/destinations';
  isRandom = false;

  constructor(
    private http: HttpClient,
    private sharedDestinationService: SharedDestinationService
  ) {}

  getRandomDestinations(): Observable<DestinationCard[]> {
    const url = `${this.randomUrl}/random`;
    return this.http.get<DestinationCard[]>(url).pipe(
      tap((response: DestinationCard[]) => {
        console.log('Success response:', response);
        this.sharedDestinationService.setDestinations(response);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error(
            'An error occurred on the client:',
            error.error.message
          );
        } else {
          // Server-side error
          console.error(
            `Backend returned code ${error.status}, body was:`,
            error.error
          );
        }
        return throwError('Something went wrong with the request.');
      })
    );
  }

  sendTravelPreferences(userPreference: any): Observable<any> {
    console.log('Sending user preference:', userPreference);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl, userPreference, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response: DestinationCard[]) => {
          console.log('Success response:', response);
          const sortedDestinations = this.sortDestinationsByRelevance(
            response,
            userPreference
          );
          console.log('sortedDestinations:', sortedDestinations);

          this.sharedDestinationService.setDestinations(sortedDestinations);
        }) as any,
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error(
              'An error occurred on the client:',
              error.error.message
            );
          } else {
            // Server-side error
            console.error(
              `Backend returned code ${error.status}, body was:`,
              error.error
            );
          }
          return throwError('Something went wrong with the request.');
        })
      );
  }

  //sorting destinations
  private sortDestinationsByRelevance(
    destinations: DestinationCard[],
    userPreferences: any
  ): DestinationCard[] {
    console.log('Destinations before sorting:', destinations);
    const sortedDestinations = destinations.sort((a, b) => {
      const totalRelevanceScoreA = this.calculateRelevanceScoreForDestination(
        a,
        userPreferences
      );
      const totalRelevanceScoreB = this.calculateRelevanceScoreForDestination(
        b,
        userPreferences
      );
      console.log(
        `Total Relevance Score for ${a.name}: ${totalRelevanceScoreA}`
      );
      console.log(
        `Total Relevance Score for ${b.name}: ${totalRelevanceScoreB}`
      );

      if (totalRelevanceScoreA !== totalRelevanceScoreB) {
        // Sort in descending order (highest relevance score first)
        console.log('Sorting:', a.name, b.name);
        return totalRelevanceScoreB - totalRelevanceScoreA;
      } else {
        // If relevance scores are equal, use destination names for tiebreaker
        console.log('Tiebreaker:', a.name, b.name);
        return b.name.localeCompare(a.name);
      }
    });

    console.log('Destinations after sorting:', sortedDestinations);
    return sortedDestinations;
  }

  private calculateRelevanceScoreForDestination(
    destination: DestinationCard,
    userPreferences: any
  ): number {
    let totalRelevanceScore = 0;
    console.log('User Preferences:', userPreferences);
    console.log('Destination Seasons:', destination.seasons);

    const userPreferenceObject =
      typeof userPreferences === 'string'
        ? JSON.parse(userPreferences)
        : userPreferences;
    {
      if (userPreferenceObject.season && userPreferenceObject.season[0]) {
        console.log(
          'User Preferences Seasons:',
          userPreferenceObject.season[0]
        );

        const seasonKey = userPreferences.season;
        const seasonValue = userPreferences.climat[0];

        console.log('Season Key:', seasonKey);
        console.log('Season Value:', seasonValue);

        const destinationSeasons = Array.isArray(destination.seasons)
          ? destination.seasons
          : [destination.seasons];

        if (
          destinationSeasons.some(
            (season: any) => season[seasonKey] === seasonValue
          )
        ) {
          console.log('Match found in seasons!');
          totalRelevanceScore += 1000;
        }
      } else {
        console.error('User Preferences Seasons is null or undefined.');
      }

      if (userPreferenceObject.budget && userPreferenceObject.budget[0]) {
        console.log('User Preferences Budget:', userPreferenceObject.budget[0]);

        const budgetKey = userPreferences.budget;
        const budgetValue = true;

        console.log('Budget Key:', budgetKey);
        console.log('Budget Value:', budgetValue);

        const destinationBudgets = Array.isArray(destination.budgets)
          ? destination.budgets
          : [destination.budgets];

        if (
          destinationBudgets.some(
            (budget: any) => budget[budgetKey] === budgetValue
          )
        ) {
          console.log('Match found in budget!');
          totalRelevanceScore += 100;
        }
      } else {
        console.error('User Preferences budget is null or undefined.');
      }

      if (userPreferenceObject.activity && userPreferenceObject.activity[0]) {
        console.log(
          'User Preferences activities:',
          userPreferenceObject.activity[0]
        );

        const activityKey = userPreferenceObject.activity;
        const activityValue = true;

        console.log('Activity Key:', activityKey);
        console.log('Activity Value:', activityValue);

        const destinationActivities = Array.isArray(destination.activities)
          ? destination.activities
          : [destination.activities];

        if (
          destinationActivities.some(
            (activity: any) => activity[activityKey] === activityValue
          )
        ) {
          totalRelevanceScore += 10;
          console.log(
            'Relevance score after activities for',
            destination.name,
            totalRelevanceScore
          );
        }
      } else {
        console.error('User Preferences Activities is null or undefined.');
      }

      if (userPreferenceObject.documents && userPreferenceObject.documents[0]) {
        console.log(
          'User Preferences documents:',
          userPreferenceObject.documents[0]
        );
        userPreferences.documents?.forEach((documentPreference: any) => {
          const documentKey = Object.keys(documentPreference)[0];
          const documentValue = documentPreference[documentKey];

          console.log('Document Key:', documentKey);
          console.log('Document Value:', documentValue);

          const destinationDocuments = Array.isArray(destination.documents)
            ? destination.documents
            : [destination.documents];

          if (
            destinationDocuments.some(
              (document: any) => document[documentKey] === documentValue
            )
          ) {
            totalRelevanceScore += 1;
            console.log(
              'Relevance score after documents for',
              destination.name,
              totalRelevanceScore
            );
          }
        });
      } else {
        console.error('User Preferences Documents is null or undefined.');
      }

      console.log(
        'Relevance Score for :',
        destination.name,
        totalRelevanceScore
      );
      return totalRelevanceScore;
    }
  }
}
