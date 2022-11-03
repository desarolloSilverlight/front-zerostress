import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {EmpresaService} from '../../../../core/services/empresa.service';
import {Empresa} from '../../../../core/models/Empresa';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-empresas.component.html',
  styleUrls: ['./edit-empresas.component.css']
})
export class EditEmpresasComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    nit: [null, Validators.required],
    razonSocial: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    direccion: [null, Validators.required],
    nombreContacto: [null, Validators.required],
    telefonoContacto: [null, Validators.required],
  });

  empresa: Empresa = new Empresa();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private empresaService: EmpresaService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.empresaService.get(this.id).toPromise().then(resp => {
        this.empresa = resp;
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
    this.fc.nit.setValue(this.empresa.nit);
    this.fc.razonSocial.setValue(this.empresa.razonSocial);
    this.fc.email.setValue(this.empresa.email);
    this.fc.direccion.setValue(this.empresa.direccion);
    this.fc.nombreContacto.setValue(this.empresa.nombreContacto);
    this.fc.telefonoContacto.setValue(this.empresa.telefonoContacto);

  }

  setForm() {
    this.empresa.nit = this.fv.nit;
    this.empresa.razonSocial = this.fv.razonSocial;
    this.empresa.email = this.fv.email;
    this.empresa.direccion = this.fv.direccion;
    this.empresa.nombreContacto = this.fv.nombreContacto;
    this.empresa.telefonoContacto = this.fv.telefonoContacto;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.empresaService.save(this.empresa).subscribe(
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
              this.router.navigate(['/backoffice', 'empresas']);
            });
          });
      }


      if (this.add) {
        this.empresa = new Empresa();
        this.setForm();
        this.empresaService.insert(this.empresa).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'empresas']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'empresas']);
            });
          });
      }
    }
    if (this.delete) {
      this.empresaService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'empresas']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'empresas']);
          });
        }
      );
    }
  }

}
