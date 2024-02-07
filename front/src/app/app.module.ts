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

@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    SearchDestinationComponent,
    DestinationComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
