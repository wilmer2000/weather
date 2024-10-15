import { Routes } from '@angular/router';
import { HomeComponent } from './features/weather/components/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: HomeComponent },
  { path: 'settings', component: HomeComponent },
];

