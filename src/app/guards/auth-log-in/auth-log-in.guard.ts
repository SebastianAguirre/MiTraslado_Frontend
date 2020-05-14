import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthLogInGuard implements CanActivate {

  constructor(private _databaseAuth: AngularFireAuth, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      return this._databaseAuth.authState
                .pipe( 
                  map( userAuth => {
                    if(userAuth) {
                      return true;
                    }else {
                      this.router.navigate(['/login']);
                      return false;

                    }
                  })
                );
    }
  
}
