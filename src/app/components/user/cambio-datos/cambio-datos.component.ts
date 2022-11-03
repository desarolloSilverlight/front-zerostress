import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { sha256 } from 'js-sha256';
import {Mensajes} from 'src/app/core/constants/Mensajes';
import {Consultantes} from 'src/app/core/models/Consultantes';
import { Usuarios } from 'src/app/core/models/Usuarios';
import {AuthService} from 'src/app/core/services/auth.service';
import {ConsultantesService} from 'src/app/core/services/consultantes.service';
import {S3ClientService} from 'src/app/core/services/s3Client.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-datos',
  templateUrl: './cambio-datos.component.html',
  styleUrls: ['./cambio-datos.component.css']
})
export class CambioDatosComponent implements OnInit {

  foto: string;
  bandera = false;
  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    lastname: [null, Validators.required],
    tipo_documento: [null, Validators.required],
    num_documento: [null, Validators.required],
    fecha_nacimiento: [],
    estado_civil: [null, Validators.required],
    ciudad: [null, Validators.required],
    direccion: [null, Validators.required],
    telefono: [null, Validators.required],
    genero: [null, Validators.required],
    imagen: [null]
  });
  user: Usuarios = new Usuarios();
  consultante: Consultantes = new Consultantes();
  submitted = true;
  respuesta :any = []
  base: any
  equals = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private consultatesService: ConsultantesService, private s3Service: S3ClientService,private usuariosService  : UsuariosService ) {
  }


  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp => {
      this.consultante.id = resp.idConsultante;
      this.user.idConsultante = resp.idConsultante;
      this.consultatesService.list(this.consultante).toPromise().then(res => {
        this.consultante.email = res[0].email
        this.consultante.idEmpresa = res[0].idEmpresa
        this.consultante.primerIngreso = res[0].primerIngreso
        if (res[0].imagen != undefined && res[0].imagen != null) {
          this.s3Service.search(res[0].imagen).subscribe((respSearch: any) => {
            this.s3Service.download(respSearch.path).subscribe((respDo: any) => {
              this.foto = "data:image/gif;base64," + respDo.base64;
              const imagen = document.getElementById('imagen') as HTMLImageElement;
              imagen.src = String(this.foto)
            })
          })
        }
        this.setInitForm(res);
      });
    });
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }
  

  setInitForm(resp: any) {
    this.fc.name.setValue(resp[0].nombre);
    this.fc.lastname.setValue(resp[0].apellidos);
    this.fc.tipo_documento.setValue(resp[0].tipoDocumento);
    this.fc.num_documento.setValue(resp[0].numDocumento);
    this.fc.fecha_nacimiento.setValue(resp[0].fechaNacimiento);
    this.fc.estado_civil.setValue(resp[0].estadoCivil);
    this.fc.ciudad.setValue(resp[0].ciudad);
    this.fc.direccion.setValue(resp[0].direccion);
    this.fc.telefono.setValue(resp[0].telefono);
    this.fc.genero.setValue(resp[0].genero);
    
  }

  setForm() {
    this.consultante.nombre = this.fv.name;
    this.consultante.apellidos = this.fv.lastname;
    this.consultante.tipoDocumento = this.fv.tipo_documento
    this.consultante.numDocumento = Number(this.fv.num_documento)
    this.consultante.fechaNacimiento = this.fv.fecha_nacimiento
    this.consultante.estadoCivil = this.fv.estado_civil
    this.consultante.ciudad = this.fv.ciudad
    this.consultante.direccion = this.fv.direccion
    this.consultante.telefono = Number(this.fv.telefono)
    this.consultante.genero = this.fv.genero
  }


  save() {
    this.submitted = true;
    if (this.form.valid) {
      const file = document.getElementById('file') as HTMLInputElement;
      const formData = new FormData();
      formData.append('file', file.files[0]);
      this.s3Service.upload(formData).subscribe((respS3:any) =>{});
      this.setForm();
      this.consultante.imagen = file.files[0].name;
      this.consultatesService.save(this.consultante).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessUpdate
          }).then(() => {
            this.router.navigate(['/app']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorUpdate,
          }).then(() => {
            this.router.navigate(['/app']);
          });
        });
    }
  }

  
  valor() {
    const file = document.getElementById('file') as HTMLInputElement;
    let reader = new FileReader();
    reader.readAsDataURL(file.files[0])
    reader.onload = function(){
      const imagen = document.getElementById('imagen') as HTMLImageElement;
      imagen.src= String(reader.result) 
    }
  }

}
