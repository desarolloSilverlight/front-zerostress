import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {NotificacionesService} from '../../../../core/services/notificaciones.service';
import {Notificaciones} from '../../../../core/models/Notificaciones';
import {Usuarios} from '../../../../core/models/Usuarios';
import {UsuariosService} from '../../../../core/services/usuarios.service';
import {TpNotificaciones} from '../../../../core/models/TpNotificaciones';
import {TpNotificacionesService} from '../../../../core/services/tpNotificaciones.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-notificaciones.component.html',
  styleUrls: ['./edit-notificaciones.component.css']
})
export class EditNotificacionesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  dataSourceU=[]
  dataSourcetp=[]


  submitted = false;

  form: FormGroup = this.fb.group({
    idTpNotificacion: [null],
    correos: [null],
    envioInmediato: [null],
    fechaEnvio: [null],
    horaEnvio: [null],
    usuario: [null],
    enviado: [null],
    variables: [null],
  });

  notificaciones: Notificaciones = new Notificaciones();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private notificacionesService: NotificacionesService, private usuariosService: UsuariosService,
              private tpNotificacionesService: TpNotificacionesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    this.usuariosService.list(new Usuarios()).toPromise().then(resp => {
      this.dataSourceU=resp;
      console.log(this.dataSourceU);
    });
    this.tpNotificacionesService.list(new TpNotificaciones()).toPromise().then(resp => {
      this.dataSourcetp=resp;
    });
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.notificacionesService.get(this.id).toPromise().then(resp => {
        this.notificaciones = resp;
        this.setInitForm();
        console.log("holaaazzzz ",this.fc)
      });
    }
    
    switch (this.type) {
      case 'a':
        this.add = true;

        break;
      case 'e':
        this.edit = true;
        break;
      case 'd':
        this.delete = true;
        this.form.disable();
        break;
      case 'v':
        this.view = true;
        this.form.disable();
        break;
    }
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  setInitForm() {
    this.fc.idTpNotificacion.setValue(this.notificaciones.idTpNotificacion);
    this.fc.correos.setValue(this.notificaciones.correos);
    this.fc.envioInmediato.setValue(this.notificaciones.envioInmediato);
    this.fc.fechaEnvio.setValue(this.notificaciones.fechaEnvio);
    this.fc.horaEnvio.setValue(this.notificaciones.horaEnvio);
    this.fc.usuario.setValue(Number(this.notificaciones.usuario));
    this.fc.enviado.setValue(this.notificaciones.enviado);
    this.fc.variables.setValue(this.notificaciones.variables);

  }

  setForm() {
    this.notificaciones.idTpNotificacion = this.fv.idTpNotificacion;
    this.notificaciones.correos = this.fv.correos;
    this.notificaciones.envioInmediato = this.fv.envioInmediato;
    this.notificaciones.fechaEnvio = this.fv.fechaEnvio;
    this.notificaciones.horaEnvio = this.fv.horaEnvio;
    this.notificaciones.usuario = this.fv.usuario;
    this.notificaciones.enviado = this.fv.enviado;
    this.notificaciones.variables = this.fv.variables;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.notificacionesService.save(this.notificaciones).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessUpdate
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorUpdate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'notificaciones']);
            });
          });
      }


      if (this.add) {
        this.notificaciones = new Notificaciones();
        this.setForm();
        this.notificacionesService.insert(this.notificaciones).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'notificaciones']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'notificaciones']);
            });
          });
      }
    }
    if (this.delete) {
      this.notificacionesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'notificaciones']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'notificaciones']);
          });
        }
      );
    }
  }

}
