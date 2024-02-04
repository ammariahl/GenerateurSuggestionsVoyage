import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgOptimizedImage } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';

@NgModule({
  declarations: [AppComponent, SuggestionComponent, SearchDestinationComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage, MenuComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
