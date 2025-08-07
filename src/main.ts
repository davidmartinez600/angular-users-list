import { bootstrapApplication } from '@angular/platform-browser';
import { AppConfig } from '@app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, AppConfig).catch((err) => console.log(err));
