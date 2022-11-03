import {Component, OnInit, ViewChild} from '@angular/core';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(NavbarComponent, {static: false})
  navbar: NavbarComponent;

  constructor(private consultanteService: ConsultantesService, private authService: AuthService, private router: Router,
              private globals: GlobalsUser) {
  }

  ngOnInit(): void {
    if (location.pathname === '/app') {
      this.router.navigateByUrl('/app/inicio');
    }
    console.log(location.pathname);
  }

}
