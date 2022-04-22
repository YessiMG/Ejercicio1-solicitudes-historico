import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { AuthGuard } from './services/auth.guard';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ToolBarComponent } from './components/molecules/tool-bar/tool-bar.component';
import { RequestsTableComponent } from './components/organisms/requests-table/requests-table.component';
import { PendingRequestsComponent } from './components/pages/pending-requests/pending-requests.component';

import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { RequestsProcessedComponent } from './components/pages/requests-processed/requests-processed.component';
import { CheckHistoricalComponent } from './components/pages/check-historical/check-historical.component';
import { ConsumptionChartComponent } from './components/organisms/consumption-chart/consumption-chart.component';
import { NewRequestsComponent } from './components/pages/new-requests/new-requests.component';
import { NewRequestsTableComponent } from './components/organisms/new-requests-table/new-requests-table.component';

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
    CheckHistoricalComponent,
    ConsumptionChartComponent,
    NewRequestsComponent,
    NewRequestsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgChartsModule
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
