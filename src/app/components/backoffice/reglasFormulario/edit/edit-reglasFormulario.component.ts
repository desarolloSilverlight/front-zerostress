import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ReglasFormularioService} from '../../../../core/services/reglasFormulario.service';
import {ReglasFormulario} from '../../../../core/models/ReglasFormulario';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-reglasFormulario.component.html',
  styleUrls: ['./edit-reglasFormulario.component.css']
})
export class EditReglasFormularioComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  idForm:number;


  submitted = false;

  form: FormGroup = this.fb.group({
    puntajeMin: [null, Validators.required],
    puntajeMax: [null, Validators.required],
  });

  reglasFormulario: ReglasFormulario = new ReglasFormulario();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private reglasFormularioService: ReglasFormularioService) {
    this.id = this.actRoute.snapshot.params.id;
    console.log("id-->", this.id)
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.reglasFormularioService.get(this.id).toPromise().then(resp => {
        this.reglasFormulario = resp;
        this.idForm = resp.idFormulario;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.idForm = this.id
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
    this.fc.puntajeMin.setValue(this.reglasFormulario.puntajeMin);
    this.fc.puntajeMax.setValue(this.reglasFormulario.puntajeMax);

  }

  setForm() {
    this.reglasFormulario.puntajeMin = this.fv.puntajeMin;
    this.reglasFormulario.puntajeMax = this.fv.puntajeMax;
  }

  save() {
    this.submitted = true;
    if(Number(this.fv.puntajeMax)>Number(this.fv.puntajeMin)){
      if (this.form.valid) {
        if (this.edit) {

          this.setForm();
          this.reglasFormularioService.save(this.reglasFormulario).subscribe(
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
                this.router.navigate(['/backoffice', 'reglasFormulario', 'list', this.idForm]);
              });
            });
        }


        if (this.add) {
          this.reglasFormulario = new ReglasFormulario();
          this.setForm();
          this.reglasFormulario.idFormulario = this.id;
          this.reglasFormularioService.insert(this.reglasFormulario).subscribe(
            (res) => {
              Swal.fire({
                title: Mensajes.titleSuccess,
                icon: 'success',
                text: Mensajes.textSuccessCreate
              }).then(() => {
                this.router.navigate(['/backoffice', 'reglasFormulario', 'list', this.idForm]);
              });
            },
            (error) => {
              Swal.fire({
                title: Mensajes.titleError,
                icon: 'error',
                text: Mensajes.textErrorCreate,
              }).then(() => {
                this.router.navigate(['/backoffice', 'reglasFormulario', 'list', this.idForm]);
              });
            });
        }
      }
    }else{
      Swal.fire({
        title: Mensajes.titleError,
        icon: 'error',
        text: Mensajes.textErrorValores,
      });
    }
    if (this.delete) {
      this.reglasFormularioService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reglasFormulario', 'list', this.idForm]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reglasFormulario', 'list', this.idForm]);
          });
        }
      );
    }
  }

}
