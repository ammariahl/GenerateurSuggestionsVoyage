import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AboutComponent } from './about/about.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllDestinationsComponent } from './all-destinations/all-destinations.component';
import { DestinationComponent } from './destination/destination.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'random',
    component: SuggestionComponent,
    title: 'Random suggestion',
  },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'search', component: SearchDestinationComponent, title: 'Search' },

  {
    path: 'api/destinations/top/:periode/:climat/:budget/:activity/:documents',
    component: SuggestionComponent,
  },
  {
    path: 'all',
    component: AllDestinationsComponent,
    title: 'All destinations',
  },
  {
    path: 'destination/:name',
    component: DestinationComponent,
    title: 'Destination :name',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
