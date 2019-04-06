import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkProvider } from '../services/network.service';
// import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {};
  showFooter = false;
  imagePath = '';
  contactNumber = "";
  contactName = "";
  constructor(
    public popCtrl: PopoverController,
    private util: NetworkProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.util.getAuthData('users/profile').subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      this.imagePath = `http://localhost:5000${res.userImage}`;
    });
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

  showAddContact() {
    this.showFooter = !this.showFooter;
  }

  addContact() {
    if (this.contactName != "" && this.contactNumber != "") {
      let contact = {
        name: this.contactName,
        phone: this.contactNumber
      };
      this.util.postAuthData('users/add-contacts', contact).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.util.toastPresent(res.message, 'success');
          this.contactName = "";
          this.showFooter = false;
          this.contactNumber = "";
        } else {
          this.util.toastPresent("Unable to save the contact due to some techincal error.", 'danger');
        }
      });
    } else {
      this.util.toastPresent("Please Fill in all the credentials.", 'danger');
    }
  }

  // changeImage() {
  //   console.log('Image Change');
  //   this.presentPopover('changeImage');
  // }

  // async presentPopover(ev: any) {
  //   const popover = await this.popCtrl.create({
  //     component: PopoverPage,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

}
