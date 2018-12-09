import { ClientLayoutComponent } from './shared/components/layouts/client-layout/client-layout.component';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'operantic/country',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'operantic',
        loadChildren: './views/operantic/operantic.module#OperanticModule',
        data: { title: 'Operantic', breadcrumb: 'OPERANTIC'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

