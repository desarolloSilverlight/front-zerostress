import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {FormulariosEmpresasService} from '../../../../core/services/formulariosEmpresas.service';
import {FormulariosEmpresas} from '../../../../core/models/FormulariosEmpresas';
import { EmpresaService } from '../../../../core/services/empresa.service';
import { Empresa } from '../../../../core/models/Empresa';
import {Formularios} from '../../../../core/models/Formularios';
import {FormulariosService} from '../../../../core/services/formularios.service';


@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-formulariosEmpresas.component.html',
  styleUrls: ['./edit-formulariosEmpresas.component.css']
})
export class EditFormulariosEmpresasComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  dataSourceE = []
  dataSourceF = []

  submitted = false;

  form: FormGroup = this.fb.group({
    idFormulario: [null, Validators.required],
    idEmpresa: [null, Validators.required],
  });

  formulariosEmpresas: FormulariosEmpresas = new FormulariosEmpresas();

  constructor(private formulariosService: FormulariosService,private empresaService: EmpresaService,private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private formulariosEmpresasService: FormulariosEmpresasService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    //empresas
    this.empresaService.list(new Empresa()).toPromise().then(resp => {
      this.dataSourceE= resp;
      console.log("Empresas")
      console.log(resp)
    });
    //formularios
    this.formulariosService.list(new Formularios()).toPromise().then(resp => {
      this.dataSourceF = resp;
      console.log("Formularios")
      console.log(resp)
    });

    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.formulariosEmpresasService.get(this.id).toPromise().then(resp => {
        this.formulariosEmpresas = resp;
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
    this.fc.idFormulario.setValue(this.formulariosEmpresas.idFormulario);
    this.fc.idEmpresa.setValue(Number(this.formulariosEmpresas.idEmpresa));

  }

  setForm() {
    this.formulariosEmpresas.idFormulario = this.fv.idFormulario;
    this.formulariosEmpresas.idEmpresa = this.fv.idEmpresa;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.formulariosEmpresasService.save(this.formulariosEmpresas).subscribe(
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
              this.router.navigate(['/backoffice', 'formulariosEmpresas']);
            });
          });
      }


      if (this.add) {
        this.formulariosEmpresas = new FormulariosEmpresas();
        this.setForm();
        this.formulariosEmpresasService.insert(this.formulariosEmpresas).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'formulariosEmpresas']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'formulariosEmpresas']);
            });
          });
      }
    }
    if (this.delete) {
      this.formulariosEmpresasService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formulariosEmpresas']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formulariosEmpresas']);
          });
        }
      );
    }
  }

}
