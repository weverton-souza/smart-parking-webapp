import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/security/interceptors/jwt.interceptor';
import { UserAccess } from './core/model/user-access.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/service/authentication.service';
import { ErrorInterceptor } from './core/security/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  currentUser: UserAccess;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role.includes('ADMIN');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
