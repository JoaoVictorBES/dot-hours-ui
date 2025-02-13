import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CadastroUsuarioComponent } from './Components/dashboard/layout/cadastro-usuario/cadastro-usuario.component';
import { CadastroProjetoComponent } from './Components/dashboard/layout/cadastro-projeto/cadastro-projeto.component';
import { ListarProjetosComponent } from './Components/dashboard/layout/listar-projetos/listar-projetos.component';
import { CadastroAtividadeComponent } from './Components/dashboard/layout/cadastro-atividade/cadastro-atividade.component';
import { ListarAtividadesComponent } from './Components/dashboard/layout/listar-atividades/listar-atividades.component';
import { LancamentoHorasComponent } from './Components/lancamento-horas/lancamento-horas.component';
import { ListarUsuariosComponent } from './Components/dashboard/layout/listar-usuarios/listar-usuarios.component';
import { DashboardUsuarioComponent } from './Components/dashboard/layout/dashboard-usuario/dashboard-usuario.component';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},

    {path: 'dashboard/admin', component: DashboardComponent},

    {path: 'cadastro/usuario', component: CadastroUsuarioComponent},

    {path: 'cadastro/projeto', component: CadastroProjetoComponent},

    {path: 'listar/projetos', component: ListarProjetosComponent},

    {path: 'cadastro/atividade', component: CadastroAtividadeComponent},

    {path: 'listar/atividades', component: ListarAtividadesComponent},

    {path: 'lancar/horas', component: LancamentoHorasComponent},

    {path: 'listar/usuarios', component: ListarUsuariosComponent},

    {path: 'dashboard/usuario', component: DashboardUsuarioComponent}

];
