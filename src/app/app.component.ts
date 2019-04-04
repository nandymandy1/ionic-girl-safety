import { Component } from '@angular/core';
import { NetworkProvider } from './services/network.service';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.style.scss'],
})
export class AppComponent {

  username: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: NetworkProvider,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.getUsername();
  }

  getUsername() {
    this.username = this.util.getusername();
  }

  logoutUser() {
    this.util.destroyToken();
    this.router.navigate(['/login']);
  }

  onActivate(e) {
    this.getUsername();
  }

}
