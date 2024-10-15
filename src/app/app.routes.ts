import { Routes } from '@angular/router';
import { HomeComponent } from './features/weather/components/home/home.component';
import { FavoritesComponent } from './features/weather/components/favorites/favorites.component';
import { SettingsComponent } from './features/weather/components/settings/settings.component';
import { ContentComponent } from './features/weather/components/content/content.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

