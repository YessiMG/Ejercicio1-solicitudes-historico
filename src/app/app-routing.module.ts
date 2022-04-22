import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckHistoricalComponent } from './components/pages/check-historical/check-historical.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NewRequestsComponent } from './components/pages/new-requests/new-requests.component';
import { PendingRequestsComponent } from './components/pages/pending-requests/pending-requests.component';
import { RequestsProcessedComponent } from './components/pages/requests-processed/requests-processed.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'pending-requests', component: PendingRequestsComponent, canActivate: [AuthGuard] },
  { path: 'requests-processed', component: RequestsProcessedComponent, canActivate: [AuthGuard] },
  { path: 'check-historical', component: CheckHistoricalComponent, canActivate: [AuthGuard] },
  { path: 'new-requests', component: NewRequestsComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
