import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NetworkProvider } from '../services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username = "";
  password = "";
  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private router: Router
  ) { }

  authenticate() {
    if (this.username != '' && this.password != '') {
      let data = {
        username: this.username,
        password: this.password
      };
      this.util.postData('users/login', data).subscribe((res: any) => {
        if (res.success) {
          this.username = "";
          this.password = "";
          this.navCtrl.navigateForward('/feed');
        } else {
          console.log(res);
          this.util.toastPresent(res.message, 'danger');
        }
      });
    } else {
      this.util.toastPresent('Please fill in all the details.', 'danger');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  getUsername() {
    return this.util.getusername();
  }


}
