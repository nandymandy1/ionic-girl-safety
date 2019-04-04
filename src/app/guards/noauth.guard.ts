import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NetworkProvider } from '../services/network.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {
  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.util.checkValidity()) {
      return true
    } else {
      this.router.navigate(['/feed']);
    }
  }
}
