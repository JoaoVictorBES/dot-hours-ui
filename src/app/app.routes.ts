import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CadastroUsuarioComponent } from './Components/dashboard/layout/cadastro-usuario/cadastro-usuario.component';
import { CadastroProjetoComponent } from './Components/dashboard/layout/cadastro-projeto/cadastro-projeto.component';
import { ListaProjetosComponent } from './Components/dashboard/layout/lista-projetos/lista-projetos.component';
import { CadastroAtividadeComponent } from './Components/dashboard/layout/cadastro-atividade/cadastro-atividade.component';

export const routes: Routes = [

    {path: '', redirectTo: 'dashboard-admin', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},

    {path: 'dashboard-admin', component: DashboardComponent},

    {path: 'cadastro-usuario', component: CadastroUsuarioComponent},

    {path: 'cadastro-projeto', component: CadastroProjetoComponent},

    {path: 'lista-projetos', component: ListaProjetosComponent},

    {path: 'cadastro-atividade', component: CadastroAtividadeComponent}

];
