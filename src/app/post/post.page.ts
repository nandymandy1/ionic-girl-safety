import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkProvider } from '../services/network.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {


  id: string;
  post = null;
  text = "";

  constructor(
    private route: ActivatedRoute,
    private util: NetworkProvider,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadPost();
  }

  ngOnInit() {
  }

  // Check for empty object
  isNotEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return true;
    }
    return false;
  }

  // Fetch the post from the server
  loadPost() {
    this.util.getAuthData(`posts/${this.id}`).subscribe((res: any) => {
      console.log(res);
      this.post = res;
    });
  }

  //like Post
  likePost(id) {
    this.util.postAuthData(`posts/like/${id}`, {})
      .subscribe((res: any) => {
        this.post = res;
      });
  }

  //unlike Post
  unlikePost(id) {
    this.util.postAuthData(`posts/unlike/${id}`, {})
      .subscribe((res: any) => {
        this.post = res;
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
  addComment() {
    if (this.text != "") {
      this.util.postAuthData(`posts/comment/${this.id}`, { text: this.text })
        .subscribe((res: any) => {
          this.post = res;
          this.text = "";
        });
    } else {
      this.util.toastPresent('Cannot add blank comment.', 'danger');
    }
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

}
