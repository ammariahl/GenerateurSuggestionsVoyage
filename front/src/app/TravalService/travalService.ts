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
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8080/api/destinations/top';
  private randomUrl = 'http://localhost:8080/api/destionations';
=======

  private apiUrl = 'http://localhost:8080/api/destinations/top';

  private randomUrl = 'http://localhost:8080/api/destionations'
>>>>>>> 15d321802d41df9cf9b56c9db9ec30e716fc5534


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
      console.log(
        `Total Relevance Score for ${a.name}: ${totalRelevanceScoreA}`
      );
      console.log(
        `Total Relevance Score for ${b.name}: ${totalRelevanceScoreB}`
      );

      // Sort in descending order (highest relevance score first)
      return totalRelevanceScoreB - totalRelevanceScoreA;
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

    if (userPreferenceObject.seasons && userPreferenceObject.seasons[0]) {
      console.log('User Preferences Seasons:', userPreferenceObject.seasons[0]);
      userPreferenceObject.seasons.forEach((seasonPreference: any) => {
        const seasonKey = Object.keys(seasonPreference)[0];
        const seasonValue = seasonPreference[seasonKey];

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
          totalRelevanceScore += 10;
        }
      });
    } else {
      console.error('User Preferences Seasons is null or undefined.');
    }

    if (userPreferenceObject.budgets && userPreferenceObject.budgets[0]) {
      console.log('User Preferences budgets:', userPreferenceObject.budgets[0]);
      userPreferences.budgets?.forEach((budgetPreference: any) => {
        const budgetKey = Object.keys(budgetPreference)[0];
        const budgetValue = budgetPreference[budgetKey];

        const destinationBudget = Array.isArray(destination.budgets)
          ? destination.budgets
          : [destination.budgets];

        if (
          destinationBudget.some(
            (budget: any) => budget[budgetKey] === budgetValue
          )
        ) {
          totalRelevanceScore += 10;
        }
      });
    } else {
      console.error('User Preferences Seasons is null or undefined.');
    }

    if (userPreferenceObject.activities && userPreferenceObject.activities[0]) {
      console.log(
        'User Preferences activities:',
        userPreferenceObject.activities[0]
      );
      userPreferences.activities?.forEach((activityPreference: any) => {
        const activityKey = Object.keys(activityPreference)[0];
        const activityValue = activityPreference[activityKey];

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
      });
    } else {
      console.error('User Preferences Seasons is null or undefined.');
    }

    if (userPreferenceObject.documents && userPreferenceObject.documents[0]) {
      console.log(
        'User Preferences documents:',
        userPreferenceObject.documents[0]
      );
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
          totalRelevanceScore += 10;
        }
      });
    } else {
      console.error('User Preferences Seasons is null or undefined.');
    }

    return totalRelevanceScore;
  }
}
