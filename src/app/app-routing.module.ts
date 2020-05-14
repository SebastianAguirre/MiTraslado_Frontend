import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLogInGuard } from './guards/auth-log-in/auth-log-in.guard';
import { AuthLogOutGuard } from './guards/auth-log-out/auth-log-out.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'registro-clientes',
    canActivate: [AuthLogOutGuard],
    loadChildren: () => import('./pages/registro-clientes/registro-clientes.module').then( m => m.RegistroClientesPageModule)
  },
  {
    path: 'login',
    canActivate: [AuthLogOutGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthLogInGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
