import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private readonly router: Router, private readonly service: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }

  async authorize(): Promise<boolean> {
    let user = this.service.getUserFromStorage();

    console.log(user);
    

    if (user && user.token) {
      await this.router.navigateByUrl('/');
      return false;
    }
    else{
    return true;}
  }

}
