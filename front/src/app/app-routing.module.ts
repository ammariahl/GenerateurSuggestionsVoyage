import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AboutComponent } from './about/about.component';
import { SearchDestinationComponent } from './search-destination/search-destination.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'random', component: SuggestionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchDestinationComponent },
  {
    path: 'suggestion/:periode/:climat/:budget/:activity/:documents',
    component: SuggestionComponent,
  },
  // { path: 'contact', component: Contact
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
