import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {RutasReglaService} from '../../../../core/services/rutasRegla.service';
import {RutasRegla} from '../../../../core/models/RutasRegla';
import {Formularios} from '../../../../core/models/Formularios';
import {FormulariosService} from '../../../../core/services/formularios.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-rutasRegla.component.html',
  styleUrls: ['./edit-rutasRegla.component.css']
})
export class EditRutasReglaComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  formularios = []
  idreglaFor:number
  submitted = false;

  form: FormGroup = this.fb.group({
    idFormulario: [null, Validators.required],
    orden: [null, Validators.required],
  });

  rutasRegla: RutasRegla = new RutasRegla();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private rutasReglaService: RutasReglaService, private formulariosService: FormulariosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  SerivicoFormulario(): void{
    this.formulariosService.list(new Formularios()).toPromise().then(resp => {
       this.formularios=resp;
    });
  }
  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.SerivicoFormulario();
      this.rutasReglaService.get(this.id).toPromise().then(resp => {
        this.rutasRegla = resp;
        this.idreglaFor = resp.idReglaFormulario;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.idreglaFor = this.id;
        this.SerivicoFormulario();
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
    this.fc.idFormulario.setValue(this.rutasRegla.idFormulario);
    this.fc.orden.setValue(this.rutasRegla.orden);
  }

  setForm() {
    this.rutasRegla.idFormulario = this.fv.idFormulario;
    this.rutasRegla.orden = this.fv.orden;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.rutasReglaService.save(this.rutasRegla).subscribe(
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
              this.router.navigate(['/backoffice', 'rutasRegla','list',this.idreglaFor]);
            });
          });
      }


      if (this.add) {
        this.rutasRegla = new RutasRegla();
        this.setForm();
        this.rutasRegla.idReglaFormulario = this.id
        this.rutasReglaService.insert(this.rutasRegla).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'rutasRegla','list',this.idreglaFor]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'rutasRegla','list',this.idreglaFor]);
            });
          });
      }
    }
    if (this.delete) {
      this.rutasReglaService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'rutasRegla','list',this.idreglaFor]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'rutasRegla','list',this.idreglaFor]);
          });
        }
      );
    }
  }

}
