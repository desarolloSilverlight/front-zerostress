import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { Mensajes } from 'src/app/core/constants/Mensajes';
import { Usuarios } from 'src/app/core/models/Usuarios';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-contrasena',
  templateUrl: './modal-contrasena.component.html',
  styleUrls: ['./modal-contrasena.component.css']
})
export class ModalContrasenaComponent implements OnInit {
  equals = false;

  form: FormGroup = this.fb.group({
    contrasena: [null],
  });

  user: Usuarios = new Usuarios();
  constructor(private fb: FormBuilder,private dialogReff: MatDialogRef<ModalContrasenaComponent>,
    private usuariosService  : UsuariosService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp => {
      this.user.idConsultante = resp.idConsultante;
      this.usuariosService.list(this.user).toPromise().then(res => {
        this.user = res[0];
    });
  });
  }

  get fv() {
    return this.form.value;
  }

  onClickNO(): void {
    this.dialogReff.close();
  }

  Contrasenas(event: any): void {
    if (event.target.value === this.fv.contrasena) {
      this.equals = false;
    } else {
      this.equals = true;
    }
  }

  Enviar(){
    if(!this.equals){
      this.user.password = sha256(this.fv.contrasena);
      console.log("akflnasf ",this.user)
      this.usuariosService.save(this.user).toPromise();
      Swal.fire({
        title: Mensajes.titleSuccess,
        icon: 'success',
        text: "Cambio de contraseña exitoso"
      }).then(() => {
        this.dialogReff.close();
        this.router.navigate(['/login']);
      });
    }else{
      Swal.fire({
        title: Mensajes.titleError,
        icon: 'error',
        text: "Las contraseñas deben ser iguales, vuelve a intentarlo"
      });
    }
  }

}
