import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from '../../core/services/auth.service';
import {Menu} from '../../core/models/Menu';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private authService: AuthService) {
    const link = $('<link class=\'inject\' href=\'./assets/backoffice.css\' rel=\'stylesheet\'>');
    $('head').append(link);
  }

  ngOnInit(): void {
    this.authService.menu().pipe(map(r=>{
      
      for (const iterator of r) {
        for (const iterator2 of iterator.submenus) {
          iterator2.link=decodeURIComponent(decodeURIComponent(iterator2.link))  
        }      
      }
      
      return r;

    })).toPromise().then((resp) => {
      this.menus = resp;
      console.log(this.menus);
    });
  }

}