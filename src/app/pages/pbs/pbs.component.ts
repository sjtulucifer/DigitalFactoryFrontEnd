import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pbs',
  template: `
  <app-pages>
    <router-outlet></router-outlet>
  </app-pages>
  `,
})
export class PBSComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}