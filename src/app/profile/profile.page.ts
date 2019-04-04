import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkProvider } from '../services/network.service';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {};
  imagePath = '';
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

  changeImage() {
    console.log('Image Change');
    this.presentPopover('changeImage');
  }

  async presentPopover(ev: any) {
    const popover = await this.popCtrl.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
