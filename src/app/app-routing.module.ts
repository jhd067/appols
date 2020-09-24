import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListadoComponent } from './components/listado/listado.component';   

const routes: Routes = [
  
  { path: 'registro/:id', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'tabla'   , component:  ListadoComponent },
  { path: '**',pathMatch : 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
