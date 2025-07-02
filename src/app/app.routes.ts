import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ueber-uns', component: AboutComponent },
  { path: 'leistungen', component: ServicesComponent },
  { path: 'referenzen', component: ReferencesComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
