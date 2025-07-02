import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule)
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ]
};
