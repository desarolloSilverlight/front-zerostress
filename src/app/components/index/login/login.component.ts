import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha256} from 'js-sha256';
import Swal from 'sweetalert2';
import {Usuario} from '../../../core/models/Usuario';
import {AuthService} from '../../../core/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: any;
  refreshToken: any;
  show = false;
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //localStorage.clear();
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['t'];
      this.refreshToken = params['re'];
      if (this.token !== undefined && this.refreshToken !== undefined) {
        localStorage.setItem('token', this.token);
        const tokenDecodedParameters = this.authService.decodedToken(this.token);
        const expParameters = Number(tokenDecodedParameters.exp) * 100000;
        localStorage.setItem('expiredToken', expParameters.toString());
        localStorage.setItem('refreshToken', this.refreshToken);  
        this.router.navigateByUrl('https://application.zerostress.com.co/app/inicio');      
                
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere Por favor'
      });
      Swal.showLoading();
      const user = new Usuario();
      user.email = this.form.get('email').value;
      user.password = sha256(this.form.get('password').value);
      this.authService.login(user).subscribe((resp: any) => {
        if (resp.access_token) {
          localStorage.setItem('token', resp.access_token);
          Swal.close();
          this.router.navigateByUrl('/' + resp.redirect);
        }
      }, (err) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          text: err.error.message
        });
      });
    }
  }

}