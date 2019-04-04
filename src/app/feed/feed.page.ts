import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NetworkProvider } from '../services/network.service';
import { ModalPage } from '../modal/modal.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  radar: Boolean;
  status = 1;

  constructor(
    private util: NetworkProvider,
    private navCtrl: NavController,
    private geoCords: Geolocation,
    // private modalCtrl: ModalController
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
    this.util.getAuthData('users/radar-status').subscribe((res: any) => {
      console.log(res);
      this.radar = res.radar.active
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

  //comment Post
  // commentPost(id, i, comments) {
  //   this.presentModal(id, i, comments);
  // }

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

  enableRadar() {
    if (this.status == 1) {
      this.status = this.status + 1;
    } else {
      this.triggerSOS();
    }
  }

  deletePost(id, i) {
    this.util.deleteAuthData(`posts/${id}`).subscribe((res: any) => {
      if (res.success) {
        this.util.toastPresent('Post deleted successfully.', 'success');
        this.posts = this.posts.filter(post => post._id != id);
      }
    });
  }

  // SOS Trigger
  triggerSOS() {
    console.log(this.radar);
    this.geoCords.getCurrentPosition().then((res) => {
      if (this.radar == false) {
        // trigger the radar inactive
        this.util.postAuthData('users/radar-disable', {}).subscribe((res: any) => {
          this.util.toastPresent('Radar turned off.', 'success');
        });
      } else {
        // trigger the radar active 
        let data = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
        this.util.postAuthData('users/radar-mode-enable', data).subscribe((res: any) => {
          this.util.toastPresent(res.message, 'success');
        });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
