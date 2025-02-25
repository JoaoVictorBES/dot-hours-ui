import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/menu/dashboard-admin/dashboard.component';
import { CadastroUsuarioComponent } from './Components/menu/cadastro-usuario/cadastro-usuario.component';
import { CadastroProjetoComponent } from './Components/menu/cadastro-projeto/cadastro-projeto.component';
import { ListarProjetosComponent } from './Components/menu/listar-projetos/listar-projetos.component';
import { CadastroAtividadeComponent } from './Components/menu/cadastro-atividade/cadastro-atividade.component';
import { ListarAtividadesComponent } from './Components/menu/listar-atividades/listar-atividades.component';
import { LancamentoHorasComponent } from './Components/lancamento-horas/lancamento-horas.component';
import { ListarUsuariosComponent } from './Components/menu/listar-usuarios/listar-usuarios.component';
import { DashboardUsuarioComponent } from './Components/menu/dashboard-usuario/dashboard-usuario.component';
import { ProjetoComponent } from './Components/projeto/projeto.component';
import { AtividadeComponent } from './Components/atividade/atividade.component';
import { EditarProjetoComponent } from './Components/menu/editar-projeto/editar-projeto.component';
import { EditarAtividadeComponent } from './Components/menu/editar-atividade/editar-atividade.component';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: 'login', component: LoginComponent},

    {path: 'dashboard/admin', component: DashboardComponent},

    {path: 'cadastro/usuario', component: CadastroUsuarioComponent},

    {path: 'cadastro/projeto', component: CadastroProjetoComponent},

    {path: 'listar/projetos', component: ListarProjetosComponent},

    {path: 'cadastro/atividade', component: CadastroAtividadeComponent},

    {path: 'listar/atividades', component: ListarAtividadesComponent},

    {path: 'lancar-horas', component: LancamentoHorasComponent},

    {path: 'listar/usuarios', component: ListarUsuariosComponent},

    {path: 'dashboard/usuario', component: DashboardUsuarioComponent},

    {path: 'projeto/:id', component: ProjetoComponent},

    {path: 'atividade/:id', component: AtividadeComponent},

    {path: 'editar/projeto/:id' , component: EditarProjetoComponent},

    {path: 'editar/atividade/:id' , component: EditarAtividadeComponent}

];
