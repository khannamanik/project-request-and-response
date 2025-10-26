import { ApplicationConfig, importProvidersFrom,provideBrowserGlobalErrorListeners,provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Correct HttpLoaderFactory function
// export function HttpLoaderFactory(_http: HttpClient) {
//  return new TranslateHttpLoader(_http, './assets/i18n/', '.json');
// }
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

  //   importProvidersFrom([
  //     TranslateModule.forRoot({
  //       loader: {
  //         provide: TranslateLoader,
  //         useFactory: (HttpLoaderFactory),
  //         deps: [HttpClient]
  //       }
  //     })
  // ])
  ]
};