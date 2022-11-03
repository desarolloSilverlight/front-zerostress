import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {UsrCausaEstresService} from '../../../../core/services/usrCausaEstres.service';
import {UsrCausaEstres} from '../../../../core/models/UsrCausaEstres';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-usrCausaEstres.component.html',
  styleUrls: ['./edit-usrCausaEstres.component.css']
})
export class EditUsrCausaEstresComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    idSbCausaEstres: [null, Validators.required],
    idPartCuerpo: [null, Validators.required],
    tpSensacion: [null, Validators.required],
    idSensacion: [null, Validators.required],
    intensidad: [null, Validators.required],
    idConsultante: [null, Validators.required],
  });

  usrCausaEstres: UsrCausaEstres = new UsrCausaEstres();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private usrCausaEstresService: UsrCausaEstresService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.usrCausaEstresService.get(this.id).toPromise().then(resp => {
        this.usrCausaEstres = resp;
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
    this.fc.idSbCausaEstres.setValue(this.usrCausaEstres.idSbCausaEstres);
    this.fc.idConsultante.setValue(this.usrCausaEstres.idConsultante);

  }

  setForm() {
    this.usrCausaEstres.idSbCausaEstres = this.fv.idSbCausaEstres;
    this.usrCausaEstres.idConsultante = this.fv.idConsultante;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.usrCausaEstresService.save(this.usrCausaEstres).subscribe(
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
              this.router.navigate(['/backoffice', 'usrCausaEstres']);
            });
          });
      }


      if (this.add) {
        this.usrCausaEstres = new UsrCausaEstres();
        this.setForm();
        this.usrCausaEstresService.insert(this.usrCausaEstres).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'usrCausaEstres']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'usrCausaEstres']);
            });
          });
      }
    }
    if (this.delete) {
      this.usrCausaEstresService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usrCausaEstres']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usrCausaEstres']);
          });
        }
      );
    }
  }

}
