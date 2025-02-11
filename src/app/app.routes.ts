import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CadastroUsuarioComponent } from './Components/dashboard/layout/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [

    {path: '', redirectTo: 'dashboard-admin', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},

    {path: 'dashboard-admin', component: DashboardComponent},

    {path: 'cadastro-usuario', component: CadastroUsuarioComponent}

];
