import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

@NgModule({
  declarations: [AppComponent, SuggestionComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
