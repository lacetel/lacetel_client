import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { MapasComponent } from './components/mapas/mapas.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { SensoresComponent } from './components/sensores/sensores.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NoAuthGuard } from './services/no-auth-guard.service';
import { UsersComponent } from './components/users/users.component';
import { AccessLevelGuard } from './services/access-level-guard.service';
// import { IconsComponent } from './components/icons/icons.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    // component: IconsComponent
  },
  {
    path: 'mapas',
    component: MapasComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'eventos',
    component: EventosComponent
  },
  {
    path: 'graficos',
    component: GraficosComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'sensores',
    component: SensoresComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  },
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ NoAuthGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ NoAuthGuard ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthGuard, AccessLevelGuard ]
  },
  {
    path: 'profile',
    component: PerfilComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
