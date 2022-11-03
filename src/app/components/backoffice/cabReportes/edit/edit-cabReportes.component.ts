import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {CabReportesService} from '../../../../core/services/cabReportes.service';
import {CabReportes} from '../../../../core/models/CabReportes';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-cabReportes.component.html',
  styleUrls: ['./edit-cabReportes.component.css']
})
export class EditCabReportesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    bdObjecto: [null, Validators.required],
  });

  cabReportes: CabReportes = new CabReportes();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private cabReportesService: CabReportesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.cabReportesService.get(this.id).toPromise().then(resp => {
        this.cabReportes = resp;
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
    this.fc.descripcion.setValue(this.cabReportes.descripcion);
    this.fc.bdObjecto.setValue(this.cabReportes.bdObjecto);

  }

  setForm() {
    this.cabReportes.descripcion = this.fv.descripcion;
    this.cabReportes.bdObjecto = this.fv.bdObjecto;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.cabReportesService.save(this.cabReportes).subscribe(
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
              this.router.navigate(['/backoffice', 'cabReportes']);
            });
          });
      }


      if (this.add) {
        this.cabReportes = new CabReportes();
        this.setForm();
        this.cabReportesService.insert(this.cabReportes).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'cabReportes']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'cabReportes']);
            });
          });
      }
    }
    if (this.delete) {
      this.cabReportesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'cabReportes']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'cabReportes']);
          });
        }
      );
    }
  }

}
