import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@/core/service/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        
        if (currentUser) {
            if (route.data.expectedRole && route.data.expectedRole.indexOf(currentUser.role) === -1) {
                this.router.navigate(['']);
                return false;
            }
            return true;
        }
        console.log("asdasd")
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
