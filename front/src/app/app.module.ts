import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { NgOptimizedImage } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { DestinationComponent } from './destination/destination.component';
import { AboutComponent } from './about/about.component';
import { TravelService } from './TravalService/travalService';
import { FamillyDestinationService } from './TravalService/Familly-Destination.Service';
import { SpringDestinationService } from './TravalService/Spring-Destination.Service';
import { BudgetDestinationService } from './TravalService/Budget-Destination.Service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllDestinationsComponent } from './all-destinations/all-destinations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DestinationNotFoundComponent } from './destination-not-found/destination-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    SearchDestinationComponent,
    DestinationComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
    PageNotFoundComponent,
    AllDestinationsComponent,
    DestinationNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    TravelService,
    FamillyDestinationService,
    SpringDestinationService,
    BudgetDestinationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
