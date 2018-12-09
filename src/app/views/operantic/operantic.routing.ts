import { Routes } from '@angular/router';

import { PaysComponent } from './pays/pays.component';


export const OperanticRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'country',
      component: PaysComponent,
      data: { title: 'PAYS', breadcrumb: 'PAYS' }
    }]
  }
];
