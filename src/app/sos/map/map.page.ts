import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Observable } from 'rxjs';
// import { tap, map } from "rxjs/operators";
import { NavParams } from '@ionic/angular';
import { NetworkProvider } from 'src/app/services/network.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  zoom: number = 15;
  lat: number;
  lng: number;

  markers: Marker[] = [];

  constructor(
    private util: NetworkProvider,
    private geoCords: Geolocation,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.markers.push({
        lat: parseFloat(params.lat),
        lng: parseFloat(params.lng),
        draggable: false,
        label: params.name
      });
    });
  }

  ngOnInit() {
    this.getUserLocation();

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  // Load the user's loaction
  getUserLocation() {
    this.geoCords.getCurrentPosition().then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;

      this.markers.push({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
        label: 'Your Location',
        draggable: false
      });

    }).catch((error) => {
      console.log('Error getting location', error);
      this.util.toastPresent('Error in getting location', 'danger');
    });
  }

  // get the sos call based on the is
  getSOSDetails() {

  }

  goBack() {
    this.router.navigate(['/list']);
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
