import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { ToolBarComponent } from './components/molecules/tool-bar/tool-bar.component';
import { RequestsTableComponent } from './components/organisms/requests-table/requests-table.component';
import { PendingRequestsComponent } from './components/pages/pending-requests/pending-requests.component';

import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { RequestsProcessedComponent } from './components/pages/requests-processed/requests-processed.component';
import { CheckHistoricalComponent } from './components/pages/check-historical/check-historical.component';

registerLocaleData(localEs);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ToolBarComponent,
    RequestsTableComponent,
    PendingRequestsComponent,
    RequestsProcessedComponent,
    CheckHistoricalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
