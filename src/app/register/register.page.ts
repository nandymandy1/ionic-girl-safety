import { Component, OnInit } from '@angular/core';
import { NetworkProvider } from '../services/network.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private router: Router
  ) { }
  name = "";
  username = "";
  password = "";
  confirm_password = "";
  address = "";
  adhar = "";
  phone = "";
  email = "";


  ngOnInit() {
  }

  registerUser() {
    if (this.validateUser()) {
      if (this.password == this.confirm_password) {
        // Register the user to the database
        let newUser = {
          username: this.username,
          password: this.password,
          adhar: this.adhar,
          name: this.name,
          email: this.email,
          address: this.address,
          phone: this.phone
        };
        this.util.postData('users/register', newUser).subscribe((res: any) => {
          if (res.success) {
            this.util.toastPresent(res.message, 'success');
            this.navCtrl.navigateForward('/home');
          } else {
            this.util.toastPresent('Unable to register the user.', 'danger');
          }
        });
      } else {
        // show alert
        this.util.toastPresent('Passwords do not match.', 'danger');
      }
    } else {
      // show alert
      this.util.toastPresent('Please fill in all the details.', 'danger');
    }
  }

  validateUser() {
    if (
      this.username != "" &&
      this.password != "" &&
      this.adhar != "" &&
      this.email != "" &&
      this.phone != "" &&
      this.address != "" &&
      this.name != "") {
      return true;
    } else {
      return false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
