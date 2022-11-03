import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuarios} from '../../../core/models/Usuarios';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { sha256 } from 'js-sha256';
import { Notificaciones } from 'src/app/core/models/Notificaciones';
import { NotificacionesService } from 'src/app/core/services/notificaciones.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rpassword',
  templateUrl: './rpassword.component.html',
  styleUrls: ['./rpassword.component.css']
})
export class RpasswordComponent implements OnInit {
  
  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
  });

  caracteres: string ="#$%&/=?¿";
  letras: string="abcdeefghijklmnopqrstuvwxyz"

  constructor(private router: Router,private fb: FormBuilder, private usuariosService: UsuariosService, 
    private notificacionService: NotificacionesService) { }

  ngOnInit(): void {
  }
  
  get fv() {
    return this.form.value;
  }

  submit():void{
    let existe=false;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor'
    });
    Swal.showLoading();
    let pass:string= String(Math.floor(Math.random() *this.letras.length));
    this.usuariosService.list(new Usuarios()).toPromise().then(resp => {
      console.log(resp);
      console.log(this.fv.email);
      resp.forEach(element => {
        if(this.fv.email===element.email){
          existe=true;
          for ( let i = 0; i < 12; i++ ) {
            if(i!=7 && i!=9 && i!=10){
              pass +=this.letras.charAt(Math.floor(Math.random() *this.caracteres.length));
            }else{
              pass += this.caracteres.charAt(Math.floor(Math.random() *this.letras.length));
            }
          }
          const notificacion = new Notificaciones();
          notificacion.correos = element.email;
          notificacion.envioInmediato = true;
          notificacion.usuario = element.email;
          notificacion.idTpNotificacion = 8;
          notificacion.variables = JSON.stringify({
            password: pass
          });
        let usuarios: Usuarios = new Usuarios();
        usuarios=element;
        usuarios.password = sha256(pass);
        this.usuariosService.save(usuarios).subscribe(
          (res) => {
            this.notificacionService.insert(notificacion).toPromise().then();
            Swal.fire({
              title: 'Exito',
              icon: 'success',
              text: 'Su nueva contraseña ha sido enviada a su correo'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }
        );
        }
      });
      if(!existe){
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'El correo no se encuentra registrado'
        });
      }
    });
  }
}
