import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Parametros} from '../../../core/models/Parametros';
import {ParametrosService} from '../../../core/services/parametros.service';
import {TP_PARAMETROS} from '../../../core/constants/Parametros';
import {Empresa} from '../../../core/models/Empresa';
import {EmpresaService} from '../../../core/services/empresa.service';
import {Usuarios} from '../../../core/models/Usuarios';
import {sha256} from 'js-sha256';
import {UsuariosService} from '../../../core/services/usuarios.service';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../core/constants/Mensajes';
import {Consultantes} from '../../../core/models/Consultantes';
import {InvitacionesService} from '../../../core/services/invitaciones.service';
import {Invitaciones} from '../../../core/models/Invitaciones';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {Notificaciones} from '../../../core/models/Notificaciones';
import {NotificacionesService} from '../../../core/services/notificaciones.service';
import {environment} from "../../../../environments/environment";
import { ModalTerminosComponent } from '../modal-terminos/modal-terminos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  show = false;

  nombre: any;  
  apellidos: any;
  email: any;
  code: any;
  password: any;

  form: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
    tpRegistro: [null, Validators.required],
    razonSocial: [null],
    direccion: [null],
    nit: [null],
    nombreContacto: [null],
    telefonoContacto: [null],
    nombre: [null],
    apellidos: [null],
    tipoConsultante: [null],
    codigoInvitacion: [null]
  });

  clase: string;
  tpRegistro: Parametros[] = [];
  valor: number;
  tittle = 'con la mejor compañía: tú';
  pass = '';
  equals = false;
  urlTerminos = `${environment.apiEndpoint}media/terminos.pdf`;

  constructor(private fb: FormBuilder, private dialog: MatDialog,
              private router: Router, private parametroService: ParametrosService, private empresaService: EmpresaService,
              private usuarioService: UsuariosService, private invitacionesService: InvitacionesService,
              private consultanteService: ConsultantesService, private notificacionService: NotificacionesService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const param = new Parametros();
    param.idTpParametro = TP_PARAMETROS.TP_REGISTRO;
    this.parametroService.list(param).toPromise().then(resp => {
      this.tpRegistro = resp;
      setTimeout(() => {
        this.activateForm(resp[0].id, resp[0].numerico);
      }, 1000);

    });
  }

  OpenDialog(): void{
    const dialogRef = this.dialog.open(ModalTerminosComponent, {width: '80%'});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  submit(): void {
    const check = document.getElementById('terminos') as HTMLInputElement;
    if (check.checked) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere Por favor'
      });
      Swal.showLoading();
      switch (this.fv.tpRegistro) {
        case 1:
          const empresa = new Empresa();
          empresa.email = this.fv.email;
          empresa.direccion = this.fv.direccion;
          empresa.razonSocial = this.fv.razonSocial;
          empresa.nit = this.fv.nit;
          empresa.nombreContacto = this.fv.nombreContacto;
          empresa.telefonoContacto = this.fv.telefonoContacto;
          this.empresaService.insert(empresa).toPromise().then((resp) => {
            const usuario = new Usuarios();
            usuario.email = this.fv.email;
            usuario.idEmpresa = resp.id;
            usuario.usuarioEmpresarial = true;
            usuario.password = sha256(this.fv.password);
            usuario.idRol = 0;
            usuario.usuarioAdmin = true;
            this.usuarioService.insert(usuario).toPromise().then(() => {
              Swal.fire({
                title: Mensajes.titleSuccess,
                icon: 'success',
                text: 'Su empresa ha sido registrada'
              }).then(() => {
                this.router.navigate(['/login']);
              });
            });
          });
          break;
        case 2:
          const consultante = new Consultantes();
          consultante.apellidos = this.fv.apellidos;
          consultante.nombre = this.fv.nombre;
          consultante.email = this.fv.email;
          let invitacion = new Invitaciones();
          invitacion.codigoInvitacion = this.form.controls.codigoInvitacion.value;
          this.invitacionesService.list(invitacion).toPromise().then(resp => {
            if (resp.length > 0) {
              invitacion = resp[0];
              consultante.idEmpresa = invitacion.idEmpresa;
              consultante.primerIngreso = true;
              consultante.idInvitacion = invitacion.id;
              this.consultanteService.insert(consultante).toPromise().then(r => {
                  const usuario = new Usuarios();
                  usuario.usuarioAdmin = false;
                  usuario.idEmpresa = r.idEmpresa;
                  usuario.idRol = 0;
                  usuario.idConsultante = r.id;
                  usuario.email = r.email;
                  usuario.password = sha256(this.fv.password);
                  usuario.usuarioEmpresarial = false;
                  usuario.estado = true;
                  const notificacion = new Notificaciones();
                  notificacion.correos = r.email;
                  notificacion.envioInmediato = true;
                  notificacion.usuario = r.email;
                  notificacion.idTpNotificacion = 1;
                  notificacion.variables = JSON.stringify({
                    nombre: consultante.nombre,
                    apellidos: consultante.apellidos,
                    email: consultante.email,
                    invitacion: invitacion.codigoInvitacion,
                    link: `${window.location.protocol}//${window.location.hostname}${window.location.port !== '' ? ':' + window.location.port : ''}/login`,
                  });
                  this.usuarioService.insert(usuario).toPromise().then(() => {
                      this.notificacionService.insert(notificacion).toPromise().then(() => {
                        Swal.fire({
                          title: Mensajes.titleSuccess,
                          icon: 'success',
                          text: 'Su usuario ha sido creado '
                        }).then(() => {
                          this.router.navigate(['/login']);
                        });
                      });
                    }
                    , reason => {
                      Swal.fire({
                        title: Mensajes.titleError,
                        icon: 'error',
                        text: reason.error.message
                      });
                    }
                  );
                }
                , reason => {
                  Swal.fire({
                    title: Mensajes.titleError,
                    icon: 'error',
                    text: reason.error.message
                  });
                }
              );
            } else {
              Swal.fire({
                title: Mensajes.titleError,
                icon: 'error',
                text: 'No existe este código de invitación'
              });
            }
          });
          break;
        case 3:
          break;
      }
    } else {
      Swal.fire({
        title: Mensajes.titleError,
        icon: 'error',
        text: 'Debes aceptar los términos de uso'
      });
    }
  }

  get fv() {
    return this.form.value;
  }

  activateForm(id: number, numero) {
    this.form.controls.tpRegistro.setValue(numero);
    const button = document.getElementById(String(id)) as HTMLButtonElement;
    this.clase = 'btn-tab-activate';
    button.setAttribute('class', this.clase);
    console.log('boton', this.tpRegistro, 'id boton ', id, 'numero: ', numero, 'fv: ', this.fv.tpRegistro);
    this.valor = id;
    this.tpRegistro.forEach(element => {
      if (element.id != id) {
        const button = document.getElementById(String(element.id)) as HTMLButtonElement;
        button.setAttribute('class', 'btn-tab');
      }
    });

    if (id === 2) {
      this.tittle = 'siendo un excelente neurofacilitador';
    } else {
      this.tittle = 'con la mejor compañía: tú';
    }
  }

  ValidarInvitacion(): void {
    const check = document.getElementById('check') as HTMLInputElement;
    check.checked = false;
    const invitacion = new Invitaciones();
    console.log(this.fv.codigoInvitacion);
    invitacion.codigoInvitacion = this.fv.codigoInvitacion;
    this.invitacionesService.list(invitacion).toPromise().then(resp => {
      if (resp.length > 0) {
        this.form.controls.codigoInvitacion.disable();
        check.checked = true;
        check.disabled = true;
      } else {
        this.form.controls.codigoInvitacion.setValue(' ');
        Swal.fire({
          title: Mensajes.titleError,
          icon: 'error',
          text: 'No existe este código de invitación'
        });
      }
    });
  }


  Contrasenas(event: any): void {
    if (event.target.value === this.fv.password) {
      this.equals = false;
    } else {
      this.equals = true;
    }
  }

}