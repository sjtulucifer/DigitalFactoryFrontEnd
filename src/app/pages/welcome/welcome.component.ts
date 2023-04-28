import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factory } from 'src/app/entities/factory';
import { Result } from 'src/app/entities/result';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  // 工厂列表
  factoryList: Factory[] = [];

  constructor(
    private factoryService: FactoryService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.factoryService.getFactoryList().subscribe({
      next: (res) => {
        if (0 == res.Code) {
          this.factoryList = res.Result as Factory[];
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

  intoFactoryPBS(id: any) {    
    this.factoryService.getFactoryById(id).subscribe({
      next: (res) => {
        res = res as Result;
        if (0 === res.Code) {
          sessionStorage.setItem('factory', JSON.stringify(res.Result));
          this.router.navigate(['/pbs/factoryObject/factoryObjectTree']);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.info('complete')
      }
    });
  }

}
