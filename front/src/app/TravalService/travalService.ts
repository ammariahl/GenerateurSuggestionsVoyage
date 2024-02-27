import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SharedDestinationService } from './Shared-destination.service';
import { DestinationCard } from '../models/destination-card.model';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private apiUrl = 'http://localhost:8080/api/destinations/top';

  private randomUrl = 'http://localhost:8080/api/destinations';


  constructor(
    private http: HttpClient,
    private sharedDestinationService: SharedDestinationService
  ) {}

  isRandom = false;
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

      if (totalRelevanceScoreA !== totalRelevanceScoreB) {
        // Sort in descending order (highest relevance score first)
        return totalRelevanceScoreB - totalRelevanceScoreA;
      } else {
        // If relevance scores are equal, use destination names for tiebreaker
        return a.name.localeCompare(b.name);
      }
    });
    //   console.log(
    //     `Total Relevance Score for ${a.name}: ${totalRelevanceScoreA}`
    //   );
    //   console.log(
    //     `Total Relevance Score for ${b.name}: ${totalRelevanceScoreB}`
    //   );

    //   // Sort in descending order (highest relevance score first)
    //   return totalRelevanceScoreB - totalRelevanceScoreA;
    // });

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

    if (userPreferenceObject.season !== undefined) {
      console.log('User Preferences Seasons:', userPreferenceObject.season);

      // Check if userPreferenceObject.season is a string
      if (typeof userPreferenceObject.season === 'string') {
        const destinationSeasons = Array.isArray(destination.seasons)
          ? destination.seasons
          : [destination.seasons];

        if (
          destinationSeasons.some(
            (season: any) => season[userPreferenceObject.season] !== undefined
          )
        ) {
          console.log('Match found in seasons!');
          totalRelevanceScore += 10;
        }
      } else if (Array.isArray(userPreferenceObject.season)) {
        // Assuming userPreferenceObject.season is an array of strings
        const userSeason = userPreferenceObject.season;

        userSeason.forEach((seasonValue: string) => {
          const destinationSeasons = Array.isArray(destination.seasons)
            ? destination.seasons
            : [destination.seasons];

          if (
            destinationSeasons.some(
              (season: any) => season[seasonValue] !== undefined
            )
          ) {
            console.log('Match found in seasons!');
            totalRelevanceScore += 10;
          }
        });
      } else {
        console.error('Invalid format for User Preferences Seasons.');
      }
    } else {
      console.error('User Preferences Seasons is null or undefined.');
    }

    if (userPreferenceObject.budget !== undefined) {
      console.log('User Preferences budgets:', userPreferenceObject.budget);

      // Check if userPreferenceObject.budget is a string
      if (typeof userPreferenceObject.budget === 'string') {
        const destinationBudget = Array.isArray(destination.budgets)
          ? destination.budgets
          : [destination.budgets];

        if (
          destinationBudget.some(
            (budget: any) => budget[userPreferenceObject.budget] !== undefined
          )
        ) {
          console.log('Match found in Budget!');
          totalRelevanceScore += 8;
        }
      } else if (Array.isArray(userPreferenceObject.budget)) {
        // Assuming userPreferenceObject.budget is an array of strings
        const userBudget = userPreferenceObject.budget;

        userBudget.forEach((budgetValue: string) => {
          const destinationBudget = Array.isArray(destination.budgets)
            ? destination.budgets
            : [destination.budgets];

          if (
            destinationBudget.some(
              (budget: any) => budget[budgetValue] !== undefined
            )
          ) {
            console.log('Match found in Budget!');
            totalRelevanceScore += 8;
          }
        });
      } else {
        console.error('Invalid format for User Preferences Budget.');
      }
    } else {
      console.error('User Preferences Budget is null or undefined.');
    }

    if (userPreferenceObject.activity !== undefined) {
      console.log(
        'User Preferences activities:',
        userPreferenceObject.activity
      );

      // Check if userPreferenceObject.activity is a string
      if (typeof userPreferenceObject.activity === 'string') {
        const destinationActivities = Array.isArray(destination.activities)
          ? destination.activities
          : [destination.activities];

        if (
          destinationActivities.some(
            (activity: any) =>
              activity[userPreferenceObject.activity] !== undefined
          )
        ) {
          totalRelevanceScore += 1;

          console.log('Match found in activity!', totalRelevanceScore);
        }
      } else if (Array.isArray(userPreferenceObject.activity)) {
        // Assuming userPreferenceObject.activity is an array of strings
        const userActivity = userPreferenceObject.activity;

        userActivity.forEach((activityValue: string) => {
          const destinationActivities = Array.isArray(destination.activities)
            ? destination.activities
            : [destination.activities];

          if (
            destinationActivities.some(
              (activity: any) => activity[activityValue] !== undefined
            )
          ) {
            totalRelevanceScore += 1;

            console.log('Match found in activity!', totalRelevanceScore);
          }
        });
      } else {
        console.error('Invalid format for User Preferences Activity.');
      }
    } else {
      console.error('User Preferences Activity is null or undefined.');
    }

    if (userPreferenceObject.budget !== undefined) {
      console.log('User Preferences budgets:', userPreferenceObject.budget);

      // Check if userPreferenceObject.budget is a string
      if (typeof userPreferenceObject.budget === 'string') {
        const destinationBudget = Array.isArray(destination.budgets)
          ? destination.budgets
          : [destination.budgets];

        if (
          destinationBudget.some(
            (budget: any) => budget[userPreferenceObject.budget] !== undefined
          )
        ) {
          totalRelevanceScore += 8;
          console.log('Match found in Budget!', totalRelevanceScore);
        }
      } else if (Array.isArray(userPreferenceObject.budget)) {
        // Assuming userPreferenceObject.budget is an array of strings
        const userBudget = userPreferenceObject.budget;

        userBudget.forEach((budgetValue: string) => {
          const destinationBudget = Array.isArray(destination.budgets)
            ? destination.budgets
            : [destination.budgets];

          if (
            destinationBudget.some(
              (budget: any) => budget[budgetValue] !== undefined
            )
          ) {
            totalRelevanceScore += 8;
            console.log('Match found in Budget!', totalRelevanceScore);
          }
        });
      } else {
        console.error('Invalid format for User Preferences Budget.');
      }
    } else {
      console.error('User Preferences Budget is null or undefined.');
    }

    if (userPreferenceObject.documents !== undefined) {
      console.log(
        'User Preferences documents:',
        userPreferenceObject.documents
      );

      // Check if userPreferenceObject.documents is an array
      if (Array.isArray(userPreferenceObject.documents)) {
        const userDocuments = userPreferenceObject.documents;

        userDocuments.forEach((documentPreference: any) => {
          const destinationDocuments = Array.isArray(destination.documents)
            ? destination.documents
            : [destination.documents];

          const documentKeys = Object.keys(documentPreference);

          if (
            destinationDocuments.some((document: any) =>
              documentKeys.every(
                (key: string) => document[key] === documentPreference[key]
              )
            )
          ) {
            totalRelevanceScore += 5;
            console.log('Match found in documents!', totalRelevanceScore);
          }
        });
      } else {
        console.error('Invalid format for User Preferences Documents.');
      }
    } else {
      console.error('User Preferences Documents is null or undefined.');
    }

    return totalRelevanceScore;
  }
}
