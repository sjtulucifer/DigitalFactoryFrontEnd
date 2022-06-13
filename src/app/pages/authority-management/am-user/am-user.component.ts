import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-am-user',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AmUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
