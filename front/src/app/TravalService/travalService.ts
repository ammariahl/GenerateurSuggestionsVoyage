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
          const sortedDestinations = this.sortDestinationsByRelevance(
            response,
            userPreference
          );

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
        return b.name.localeCompare(a.name);
      }
    });

    return sortedDestinations;
  }

  private calculateRelevanceScoreForDestination(
    destination: DestinationCard,
    userPreferences: any
  ): number {
    let totalRelevanceScore = 0;

    const userPreferenceObject =
      typeof userPreferences === 'string'
        ? JSON.parse(userPreferences)
        : userPreferences;
    {
      if (userPreferenceObject.season && userPreferenceObject.season[0]) {
        const seasonKey = userPreferences.season;
        const seasonValue = userPreferences.climat[0];

        const destinationSeasons = Array.isArray(destination.seasons)
          ? destination.seasons
          : [destination.seasons];

        if (
          destinationSeasons.some(
            (season: any) => season[seasonKey] === seasonValue
          )
        ) {
          totalRelevanceScore += 1000;
        }
      } else {
        console.error('User Preferences Seasons is null or undefined.');
      }

      if (userPreferenceObject.budget && userPreferenceObject.budget[0]) {
        const budgetKey = userPreferences.budget;
        const budgetValue = true;

        const destinationBudgets = Array.isArray(destination.budgets)
          ? destination.budgets
          : [destination.budgets];

        if (
          destinationBudgets.some(
            (budget: any) => budget[budgetKey] === budgetValue
          )
        ) {
          totalRelevanceScore += 100;
        }
      } else {
        console.error('User Preferences budget is null or undefined.');
      }

      if (userPreferenceObject.activity && userPreferenceObject.activity[0]) {
        const activityKey = userPreferenceObject.activity;
        const activityValue = true;

        const destinationActivities = Array.isArray(destination.activities)
          ? destination.activities
          : [destination.activities];

        if (
          destinationActivities.some(
            (activity: any) => activity[activityKey] === activityValue
          )
        ) {
          totalRelevanceScore += 10;
        }
      } else {
        console.error('User Preferences Activities is null or undefined.');
      }

      if (userPreferenceObject.documents && userPreferenceObject.documents[0]) {
        userPreferences.documents?.forEach((documentPreference: any) => {
          const documentKey = Object.keys(documentPreference)[0];
          const documentValue = documentPreference[documentKey];

          const destinationDocuments = Array.isArray(destination.documents)
            ? destination.documents
            : [destination.documents];

          if (
            destinationDocuments.some(
              (document: any) => document[documentKey] === documentValue
            )
          ) {
            totalRelevanceScore += 1;
          }
        });
      } else {
        console.error('User Preferences Documents is null or undefined.');
      }

      return totalRelevanceScore;
    }
  }
}
