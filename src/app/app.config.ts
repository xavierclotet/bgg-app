import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
  //  provideZoneChangeDetection({ eventCoalescing: true }), 
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(withIncrementalHydration(),  withEventReplay()),
    provideHttpClient(withFetch())
  ]
};
