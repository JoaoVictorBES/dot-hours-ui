import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/menu/dashboard-admin/dashboard.component';
import { CadastroUsuarioComponent } from './Components/menu/cadastro-usuario/cadastro-usuario.component';
import { CadastroProjetoComponent } from './Components/menu/cadastro-projeto/cadastro-projeto.component';
import { ListarProjetosComponent } from './Components/menu/listar-projetos/listar-projetos.component';
import { CadastroAtividadeComponent } from './Components/menu/cadastro-atividade/cadastro-atividade.component';
import { ListarAtividadesComponent } from './Components/menu/listar-atividades/listar-atividades.component';
import { ListarUsuariosComponent } from './Components/menu/listar-usuarios/listar-usuarios.component';
import { DashboardUsuarioComponent } from './Components/menu/dashboard-usuario/dashboard-usuario.component';
import { ProjetoComponent } from './Components/projeto/projeto.component';
import { AtividadeComponent } from './Components/atividade/atividade.component';
import { EditarProjetoComponent } from './Components/menu/editar-projeto/editar-projeto.component';
import { EditarAtividadeComponent } from './Components/menu/editar-atividade/editar-atividade.component';
import { EditarUsuarioComponent } from './Components/menu/editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './Components/usuario/usuario.component';
import { ListarLancamentosComponent } from './Components/menu/listar-lancamentos/listar-lancamentos.component';
import { EditarLancamentoComponent } from './Components/menu/editar-lancamento/editar-lancamento.component';
import { CadastroLancamentoHorasComponent } from './Components/menu/cadastro-lancamento-horas/lancamento-horas.component';
import { LancamentoHorasComponent } from './Components/lancamento-horas/lancamento-horas.component';
import { MainLayoutComponent } from './Components/menu/main-layout/main-layout.component';
import { AuthGuard } from './Auth/auth.guard';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // 📌 Rota para solicitar recuperação de senha
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // 📌 Rota para redefinir a senha com o token
  { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: '',
    component: MainLayoutComponent, // Páginas com sidebar
    children: [
      { path: 'dashboard/admin', component: DashboardComponent },
      { path: 'dashboard/usuario', component: DashboardUsuarioComponent },

      // 🛑 Rotas protegidas para ADMIN 🛑
      { path: 'cadastro/usuario', component: CadastroUsuarioComponent },
      { path: 'cadastro/projeto', component: CadastroProjetoComponent},
      { path: 'cadastro/atividade', component: CadastroAtividadeComponent },
      { path: 'projeto/:id', component: ProjetoComponent },

      { path: 'editar/projeto/:id', component: EditarProjetoComponent },
      { path: 'editar/atividade/:id', component: EditarAtividadeComponent },
      { path: 'editar/usuario/:id', component: EditarUsuarioComponent },

      // 🚀 Demais rotas acessíveis a todos os usuários
      { path: 'cadastro/lancamento', component: CadastroLancamentoHorasComponent },
      { path: 'listar/projetos', component: ListarProjetosComponent },
      { path: 'listar/atividades', component: ListarAtividadesComponent },
      { path: 'lancar-horas', component: LancamentoHorasComponent },
      { path: 'listar/usuarios', component: ListarUsuariosComponent },
      { path: 'listar/lancamentos', component: ListarLancamentosComponent },

      
      { path: 'atividade/:id', component: AtividadeComponent },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: 'lancamento/:id', component: LancamentoHorasComponent },

      { path: 'editar/lancamento/:id', component: EditarLancamentoComponent }
      ]
    }
  ];
