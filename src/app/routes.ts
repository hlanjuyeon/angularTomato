import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { WriteComponent } from './write/write.component';
import { SelectComponent } from './select/select.component';

const routeConfig: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Note Home'
  },
  {
    path: 'details/:id',
    component: SelectComponent,
    title: 'Note Select'
  },
  {
    path: 'write/:noteListCount',
    component: WriteComponent,
    title: 'Note Write'
  }
];

export default routeConfig;