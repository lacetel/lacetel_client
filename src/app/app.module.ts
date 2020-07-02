/// Native modules
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/// My modules & components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { MatComponentsModule } from './modules/mat-components/mat-components.module';
import { MapasComponent } from './components/mapas/mapas.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { SensoresComponent, ConfirmationDialogComponent } from './components/sensores/sensores.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OpenmapComponent } from './components/openmap/openmap.component';
import { GlobalError } from './classes/global-error';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ToolsComponent } from './components/tools/tools.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsersComponent } from './components/users/users.component';
import { LoadErrorComponent } from './components/load-error/load-error.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { AddSensorDialogComponent, AddConfirmDialogComponent } from './components/add-sensor-dialog/add-sensor-dialog.component';
import { EditSensorDialogComponent } from './components/edit-sensor-dialog/edit-sensor-dialog.component';
import { AuthInterceptor } from './utils/auth-interceptor';

///spanish Language Modules
//import { LOCALE_ID, /*NgModule, ErrorHandler*/ } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

//register locales/es
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MapasComponent,
    EventosComponent,
    GraficosComponent,
    SensoresComponent,
    LoginComponent,
    RegisterComponent,
    OpenmapComponent,
    ConfirmationDialogComponent,
    AddConfirmDialogComponent,
    AboutUsComponent,
    ToolsComponent,
    PerfilComponent,
    UsersComponent,
    LoadErrorComponent,
    // IconsComponent,
    UserDialogComponent,
    AddSensorDialogComponent,
	  EditSensorDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    AddConfirmDialogComponent,
    AddSensorDialogComponent,
	  EditSensorDialogComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule,
    HttpClientModule,
    MatComponentsModule,
    MatIconModule,
  ],
  providers: [
    AuthGuard,
    UserService,
    AuthService,
    {
      provide: ErrorHandler,
      useClass: GlobalError
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
	{ 
	  provide: LOCALE_ID, 
	  useValue: 'es' 
	} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
