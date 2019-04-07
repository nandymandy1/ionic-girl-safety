import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.page.html',
  styleUrls: ['./helpline.page.scss'],
})
export class HelplinePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

}
