import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NetworkProvider } from '../services/network.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  posts = [];
  text = "";
  username: string;
  user_id: string;
  urgent: Boolean = false;

  radar: Boolean = false;
  status = 0;

  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private geoCords: Geolocation
  ) {

  }

  ngOnInit() {
    this.loadPosts();
  }

  ionViewWillEnter() {
    this.loadPosts();
    // get the user radar status
    this.getRadarStatus();
  }

  getRadarStatus() {
    // write the logic for the radar status
    this.util.getAuthData('users/radar-status').subscribe((res: Radar) => {
      console.log(res.active);
      if (res.active != null) {
        if (res.active) {
          this.status = 1;
          this.radar = res.active;
        }
      }
    });
  }

  // Enable the radar methods
  radarSystem() {
    if (this.status == 1) {
      this.status = this.status + 1;
    } else {
      if (this.radar) {
        this.enableRadar();
      } else {
        this.disableRadar();
      }
    }
  }

  // Enable the urgent mode
  urgentCall() {
    this.geoCords.getCurrentPosition().then((res) => {
      let data = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      this.util.postAuthData('users/urgent-mode', data).subscribe((res: any) => {
        this.util.toastPresent(res.message, 'success');
        console.log(res);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadPosts() {
    this.user_id = this.util.getuserId();
    this.util.getData('posts').subscribe((res: any) => {
      this.posts = res;
    });
  }

  //like Post
  likePost(id, i) {
    this.util.postAuthData(`posts/like/${id}`, {})
      .subscribe((res: any) => {
        this.posts.splice(i, 1, res);
      });
  }

  //unlike Post
  unlikePost(id, i) {
    this.util.postAuthData(`posts/unlike/${id}`, {})
      .subscribe((res: any) => {
        this.posts.splice(i, 1, res);
      })
  }

  // check if the like is in the likes array of the post
  likeCheck(likes) {
    let user_id = this.util.authUser();
    return likes.some((el) => {
      return el.user.toString() === user_id
    });
  }

  // comment Post
  commentPost(id, i, comments) {
    this.presentModal(id, i, comments);
  }

  async presentModal(id, i, comments) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { value: id, index: i }
    });
    modal.onDidDismiss().then(() => {
      this.loadPosts();
    });
  }

  // Post The Text
  addPost() {
    if (this.text != "") {
      // then post the data to the server
      let newPost = {
        text: this.text
      };
      this.util.postAuthData('posts', newPost).subscribe((res: any) => {
        this.posts.unshift(res);
      });
    } else {
      // show the error
      this.util.toastPresent('Please enter the post.', 'danger');
    }
  }

  // Navigate to the particular posts page with id 
  goToPost(id) {
    this.navCtrl.navigateForward(`/post/${id}`);
  }

  getUsername() {
    return this.util.getusername();
  }

  deletePost(id, i) {
    this.util.deleteAuthData(`posts/${id}`).subscribe((res: any) => {
      if (res.success) {
        this.util.toastPresent('Post deleted successfully.', 'success');
        this.posts = this.posts.filter(post => post._id != id);
      }
    });
  }

  // To Enable the radar system
  enableRadar() {
    this.geoCords.getCurrentPosition().then((res) => {
      let data = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      this.util.postAuthData('users/radar-mode-enable', data).subscribe((res: any) => {
        this.util.toastPresent(res.message, 'success');
        console.log(res);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // To Disable the radar system
  disableRadar() {
    if (!this.radar) {
      this.util.postAuthData('users/radar-disable', {}).subscribe((res: any) => {
        this.util.toastPresent('Radar turned off.', 'success');
      });
    }
  }

}


interface Radar {
  _id: String,
  lat: Number,
  lng: Number,
  active: Boolean,
  name: String,
  user: String,
  date: Date
}