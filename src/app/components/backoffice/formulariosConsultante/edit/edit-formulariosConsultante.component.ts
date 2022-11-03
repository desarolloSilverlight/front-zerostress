import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {FormulariosConsultanteService} from '../../../../core/services/formulariosConsultante.service';
import {FormulariosConsultante} from '../../../../core/models/FormulariosConsultante';
import {Formularios} from '../../../../core/models/Formularios';
import {FormulariosService} from '../../../../core/services/formularios.service';
import {Consultantes} from '../../../../core/models/Consultantes';
import {ConsultantesService} from '../../../../core/services/consultantes.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-formulariosConsultante.component.html',
  styleUrls: ['./edit-formulariosConsultante.component.css']
})
export class EditFormulariosConsultanteComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  formularios = [];
  consultante=[];


  submitted = false;

  form: FormGroup = this.fb.group({
    idFormulario: [null, Validators.required],
    idConsultante: [null, Validators.required],
    orden: [null, Validators.required],
  });

  formulariosConsultante: FormulariosConsultante = new FormulariosConsultante();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private formulariosConsultanteService: FormulariosConsultanteService, 
              private formulariosService: FormulariosService, private consultantesService: ConsultantesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ConsumiendoServicios():void{
    this.formulariosService.list(new Formularios()).toPromise().then(resp => {
      this.formularios=resp;
    });
    this.consultantesService.list(new Consultantes()).toPromise().then(resp => {
      this.consultante=resp;
    });
  }
  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.ConsumiendoServicios();
      this.formulariosConsultanteService.get(this.id).toPromise().then(resp => {
        this.formulariosConsultante = resp;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.ConsumiendoServicios();
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
    this.fc.idFormulario.setValue(this.formulariosConsultante.idFormulario);
    this.fc.idConsultante.setValue(this.formulariosConsultante.idConsultante);
    this.fc.orden.setValue(this.formulariosConsultante.orden);

  }

  setForm() {
    this.formulariosConsultante.idFormulario = this.fv.idFormulario;
    this.formulariosConsultante.idConsultante = this.fv.idConsultante;
    this.formulariosConsultante.orden = this.fv.orden;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.formulariosConsultanteService.save(this.formulariosConsultante).subscribe(
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
              this.router.navigate(['/backoffice', 'formulariosConsultante']);
            });
          });
      }


      if (this.add) {
        this.formulariosConsultante = new FormulariosConsultante();
        this.setForm();
        this.formulariosConsultanteService.insert(this.formulariosConsultante).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'formulariosConsultante']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'formulariosConsultante']);
            });
          });
      }
    }
    if (this.delete) {
      this.formulariosConsultanteService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formulariosConsultante']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formulariosConsultante']);
          });
        }
      );
    }
  }

}
