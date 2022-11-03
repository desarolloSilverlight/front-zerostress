import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {NeurofacilitadorService} from '../../../../core/services/neurofacilitador.service';
import {Neurofacilitador} from '../../../../core/models/Neurofacilitador';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-neurofacilitador.component.html',
  styleUrls: ['./edit-neurofacilitador.component.css']
})
export class EditNeurofacilitadorComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    nombres: [null, Validators.required],
    apellidos: [null, Validators.required]
  });

  neurofacilitador: Neurofacilitador = new Neurofacilitador();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private neurofacilitadorService: NeurofacilitadorService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.neurofacilitadorService.get(this.id).toPromise().then(resp => {
        this.neurofacilitador = resp;
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
    this.fc.nombres.setValue(this.neurofacilitador.nombres);
    this.fc.apellidos.setValue(this.neurofacilitador.apellidos);

  }

  setForm() {
    this.neurofacilitador.nombres = this.fv.nombres;
    this.neurofacilitador.apellidos = this.fv.apellidos;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.neurofacilitadorService.save(this.neurofacilitador).subscribe(
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
              this.router.navigate(['/backoffice', 'neurofacilitadores']);
            });
          });
      }


      if (this.add) {
        this.neurofacilitador = new Neurofacilitador();
        this.setForm();
        this.neurofacilitadorService.insert(this.neurofacilitador).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'neurofacilitadores']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'neurofacilitadores']);
            });
          });
      }
    }
    if (this.delete) {
      this.neurofacilitadorService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'neurofacilitadores']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'neurofacilitadores']);
          });
        }
      );
    }
  }

}
