import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {GruposDiagnosticoService} from '../../../../core/services/gruposDiagnostico.service';
import {GruposDiagnostico} from '../../../../core/models/GruposDiagnostico';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-gruposDiagnostico.component.html',
  styleUrls: ['./edit-gruposDiagnostico.component.css']
})
export class EditGruposDiagnosticoComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    idTpEstres: [null, Validators.required],
    descripcion2: [null, Validators.required]
  });

  gruposDiagnostico: GruposDiagnostico = new GruposDiagnostico();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private gruposDiagnosticoService: GruposDiagnosticoService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.gruposDiagnosticoService.get(this.id).toPromise().then(resp => {
        this.gruposDiagnostico = resp;
        this.setInitForm();
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
    this.fc.descripcion.setValue(this.gruposDiagnostico.descripcion);
    this.fc.idTpEstres.setValue(this.gruposDiagnostico.idtpEstres);
    this.fc.descripcion2.setValue(this.gruposDiagnostico.descripcion2);
  }

  setForm() {
    this.gruposDiagnostico.descripcion = this.fv.descripcion;
    this.gruposDiagnostico.idtpEstres = this.fv.idTpEstres;
    this.gruposDiagnostico.descripcion2 = this.fv.descripcion2;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.gruposDiagnosticoService.save(this.gruposDiagnostico).subscribe(
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
              this.router.navigate(['/backoffice', 'gruposDiagnostico']);
            });
          });
      }


      if (this.add) {
        this.gruposDiagnostico = new GruposDiagnostico();
        this.setForm();
        this.gruposDiagnosticoService.insert(this.gruposDiagnostico).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'gruposDiagnostico']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'gruposDiagnostico']);
            });
          });
      }
    }
    if (this.delete) {
      this.gruposDiagnosticoService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'gruposDiagnostico']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'gruposDiagnostico']);
          });
        }
      );
    }
  }

}
