import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

export const routes: Routes = [

    {path: '', redirectTo: 'dashboard-admin', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},

    {path: 'dashboard-admin', component: DashboardComponent}

];
