import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authority-management',
  template: `
  <app-pages>
    <router-outlet></router-outlet>
  </app-pages>
  `,
})
export class AuthorityManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
