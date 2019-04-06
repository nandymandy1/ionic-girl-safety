import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NetworkProvider } from 'src/app/services/network.service';


/**
 * GET The list of active SOS's
 */

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  sosList = [];

  constructor(
    private util: NetworkProvider,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getSOSList();
  }

  getSOSList() {
    this.util.getAuthData('users/radar-mode').subscribe((res: any) => {
      console.log(res);
      this.sosList = res.sos;
    });
  }

  navigateToMap(sos) {
    let navObj: NavigationExtras = {
      queryParams: {
        'name': sos.name,
        'lat': sos.lat,
        'lng': sos.lng
      }
    };
    this.router.navigate(['/maps'], navObj);
  }


}
