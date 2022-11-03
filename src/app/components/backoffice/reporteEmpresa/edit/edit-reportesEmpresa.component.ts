import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ReportesEmpresaService} from '../../../../core/services/reportesEmpresa.service';
import {ReportesEmpresa} from '../../../../core/models/ReportesEmpresa';
import {EmpresaService} from '../../../../core/services/empresa.service';
import {Empresa} from '../../../../core/models/Empresa';
import {CabReportes} from '../../../../core/models/CabReportes';
import {CabReportesService} from '../../../../core/services/cabReportes.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-reportesEmpresa.component.html',
  styleUrls: ['./edit-reportesEmpresa.component.css']
})
export class EditReportesEmpresaComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  Empresas=[]
  Reportes=[]

  submitted = false;

  form: FormGroup = this.fb.group({
    idReporte: [null, Validators.required],
    idEmpresa: [null, Validators.required],
  });

  reportesEmpresa: ReportesEmpresa = new ReportesEmpresa();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private reportesEmpresaService: ReportesEmpresaService, private empresaService: EmpresaService,
              private cabReportesService: CabReportesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.reportesEmpresaService.get(this.id).toPromise().then(resp => {
        this.reportesEmpresa = resp;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        const empresa = new Empresa();
      this.empresaService.list(empresa).toPromise().then(resp => {
        this.Empresas = resp;
      });
      this.cabReportesService.list(new CabReportes()).toPromise().then(resp => {
        this.Reportes = resp;     
      });
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
    this.fc.idReporte.setValue(this.reportesEmpresa.idReporte);
    this.fc.idEmpresa.setValue(this.reportesEmpresa.idEmpresa);

  }

  setForm() {
    this.reportesEmpresa.idReporte = this.fv.idReporte;
    this.reportesEmpresa.idEmpresa = this.fv.idEmpresa;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.reportesEmpresaService.save(this.reportesEmpresa).subscribe(
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
              this.router.navigate(['/backoffice', 'reporteEmpresa']);
            });
          });
      }


      if (this.add) {
        this.reportesEmpresa = new ReportesEmpresa();
        this.setForm();
        this.reportesEmpresaService.insert(this.reportesEmpresa).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'reportesEmpresa']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'reportesEmpresa']);
            });
          });
      }
    }
    if (this.delete) {
      this.reportesEmpresaService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reportesEmpresa']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reportesEmpresa']);
          });
        }
      );
    }
  }

}
