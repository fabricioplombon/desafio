import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResgateComponent } from './pages/resgate/resgate.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'resgate/:nome',
    component: ResgateComponent
  },
  { 
    path: 'resgate',
    redirectTo: ''    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
