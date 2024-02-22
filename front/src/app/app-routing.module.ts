import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AboutComponent } from './about/about.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'random', component: SuggestionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchDestinationComponent },

  {
    path: 'api/destinations/top/:periode/:climat/:budget/:activity/:documents',
    component: SuggestionComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
