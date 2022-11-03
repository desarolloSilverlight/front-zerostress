import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ConsultantesService} from '../../../../core/services/consultantes.service';
import {Consultantes} from '../../../../core/models/Consultantes';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-consultantes.component.html',
  styleUrls: ['./edit-consultantes.component.css']
})
export class EditConsultantesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    nombre: [null, Validators.required],
    apellidos: [null, Validators.required],
    email: [null, Validators.required],
    idEmpresa: [null, Validators.required]
  });

  consultantes: Consultantes = new Consultantes();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private consultantesService: ConsultantesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.consultantesService.get(this.id).toPromise().then(resp => {
        this.consultantes = resp;
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
    this.fc.nombre.setValue(this.consultantes.nombre);
    this.fc.apellidos.setValue(this.consultantes.apellidos);
    this.fc.email.setValue(this.consultantes.email);
    this.fc.idEmpresa.setValue(this.consultantes.idEmpresa);

  }

  setForm() {
    this.consultantes.nombre = this.fv.nombre;
    this.consultantes.apellidos = this.fv.apellidos;
    this.consultantes.email = this.fv.email;
    this.consultantes.idEmpresa = this.fv.idEmpresa;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.consultantesService.save(this.consultantes).subscribe(
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
              this.router.navigate(['/backoffice', 'consultantes']);
            });
          });
      }


      if (this.add) {
        this.consultantes = new Consultantes();
        this.setForm();
        this.consultantesService.insert(this.consultantes).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'consultantes']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'consultantes']);
            });
          });
      }
    }
    if (this.delete) {
      this.consultantesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'consultantes']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'consultantes']);
          });
        }
      );
    }
  }

}
