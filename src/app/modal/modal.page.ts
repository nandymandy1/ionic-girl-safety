import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NetworkProvider } from '../services/network.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() value: string;
  @Input() index: number;
  @Input() comments = [];

  text = "";

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private util: NetworkProvider
  ) {
  }
  ngOnInit() {
    if (this.value == undefined) {
      this.router.navigate(['/feed']);
    }
  }

  //comment Post
  addComment() {
    if (this.text != "") {
      this.util.postAuthData(`posts/comment/${this.value}`, { text: this.text })
        .subscribe((res: any) => {
          this.comments = res.comments;
          this.text = "";
        });
    } else {
      this.util.toastPresent('Cannot add blank comment.', 'danger');
    }
  }

  // go back to feed page
  goBack() {
    this.modalCtrl.dismiss();
  }

}
