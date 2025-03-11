import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory} from '@nestjs/core';
import { ApplicationModule } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


