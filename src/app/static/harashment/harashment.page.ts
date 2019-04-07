import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-harashment',
  templateUrl: './harashment.page.html',
  styleUrls: ['./harashment.page.scss'],
})
export class HarashmentPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/feed']);
  }

}
