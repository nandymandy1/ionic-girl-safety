import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NetworkProvider } from '../services/network.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private router: Router
  ) { }
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.util.checkValidity()) {
      return true
    } else {
      this.router.navigate(['/login']);
    }
  }
}
