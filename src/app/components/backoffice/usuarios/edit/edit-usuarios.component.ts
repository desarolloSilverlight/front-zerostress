import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {UsuariosService} from '../../../../core/services/usuarios.service';
import {Usuarios} from '../../../../core/models/Usuarios';
import {RoleService} from '../../../../core/services/role.service';
import {Rol} from '../../../../core/models/Rol';
import {EmpresaService} from '../../../../core/services/empresa.service';
import {Empresa} from '../../../../core/models/Empresa';
import {sha256} from 'js-sha256';


@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.css']
})
export class EditUsuariosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  dataRoles: Rol[] = [];
  dataEmpresa: Empresa[] = [];
  dataUserVi = [];
  submitted = false;
  show = false;

  form: FormGroup = this.fb.group({
    idConsultante: [null],
    idNeurofacilitador: [null],
    email: [null, Validators.required],
    idRol: [null, Validators.required],
    idEmpresa: [null, Validators.required],
    usuarioEmpresarial: [null],
    usuarioAdmin: [null],
    estado: [null]
  });

  formPass: FormGroup = this.fb.group({
    password: [null, Validators.required],
  });


  usuarios: Usuarios = new Usuarios();
  bandera: boolean;

  constructor(private empresaService: EmpresaService, private rolService: RoleService,
              private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private usuariosService: UsuariosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.usuariosService.get(this.id).toPromise().then(resp => {
        this.usuarios = resp;
        this.setInitForm();
      });
    }

    this.rolService.list(new Rol()).toPromise().then(resp => {
      this.dataRoles = resp;
    });
    this.empresaService.list(new Empresa()).toPromise().then(resp => {
      this.dataEmpresa = resp;
    });
    this.usuariosService.listVi(new Usuarios()).toPromise().then(resp => {
      this.dataUserVi = resp;
    });
    switch (this.type) {
      case 'a':
        this.add = true;
        break;
      case 'e':
        this.edit = true;
        this.formPass.disable();
        this.bandera = true;
        break;
      case 'd':
        this.delete = true;
        this.form.disable();
        this.formPass.disable();
        break;
      case 'v':
        this.view = true;
        this.form.disable();
        this.formPass.disable();
        break;
    }
  }


  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  get fcP() {
    return this.formPass.controls;
  }

  get fvP() {
    return this.formPass.value;
  }

  setInitForm() {
    this.fc.idConsultante.setValue(this.usuarios.idConsultante);
    this.fc.idNeurofacilitador.setValue(this.usuarios.idNeurofacilitador);
    this.fc.email.setValue(this.usuarios.email);
    this.fcP.password.setValue(this.usuarios.password);
    this.fc.idRol.setValue(this.usuarios.idRol);
    this.fc.idEmpresa.setValue(this.usuarios.idEmpresa);
    this.fc.usuarioEmpresarial.setValue(this.usuarios.usuarioEmpresarial);
    this.fc.usuarioAdmin.setValue(this.usuarios.usuarioAdmin);
    this.fc.estado.setValue(this.usuarios.estado);
  }

  setForm() {
    this.usuarios.idConsultante = this.fv.idConsultante;
    this.usuarios.idNeurofacilitador = this.fv.idNeurofacilitador;
    this.usuarios.email = this.fv.email;
    this.usuarios.idRol = this.fv.idRol;
    this.usuarios.idEmpresa = this.fv.idEmpresa;
    this.usuarios.usuarioEmpresarial = this.fv.usuarioEmpresarial;
    this.usuarios.usuarioAdmin = this.fv.usuarioAdmin;
    this.usuarios.estado = this.fv.estado;

    console.log(this.usuarios.idConsultante);
    console.log(this.usuarios.idNeurofacilitador);
    console.log(this.usuarios.email);
    console.log(this.usuarios.password);
    console.log(this.usuarios.idRol);
    console.log(this.usuarios.idEmpresa);
    console.log(this.usuarios.usuarioEmpresarial);
    console.log(this.usuarios.usuarioAdmin);
  }

  editPassword() {

    console.log('entro');
    if (this.bandera) {
      this.bandera = false;
      this.formPass.enable();
    } else {
      this.bandera = true;
      this.formPass.disable();
    }
  }

  save() {
    this.submitted = true;
    if (this.form.valid && this.formPass.valid) {
      if (this.edit) {
        this.setForm();
        this.usuarios.password = sha256(this.formPass.get('password').value);
        this.usuariosService.save(this.usuarios).subscribe(
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
              this.router.navigate(['/backoffice', 'usuarios']);
            });
          });
      }


      if (this.add) {
        this.usuarios = new Usuarios();
        this.setForm();
        this.usuarios.password = sha256(this.formPass.get('password').value);
        this.usuariosService.insert(this.usuarios).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'usuarios']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'usuarios']);
            });
          });
      }
    }
    if (this.delete) {
      this.usuariosService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usuarios']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usuarios']);
          });
        }
      );
    }
  }

}
