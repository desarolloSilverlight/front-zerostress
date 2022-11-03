import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FormulariosConsultante} from 'src/app/core/models/FormulariosConsultante';
import {AuthService} from 'src/app/core/services/auth.service';
import {FormulariosService} from 'src/app/core/services/formularios.service';
import {FormulariosConsultanteService} from 'src/app/core/services/formulariosConsultante.service';
import { Consultantes } from 'src/app/core/models/Consultantes';
import { ConsultantesService } from 'src/app/core/services/consultantes.service';
import { S3ClientService } from 'src/app/core/services/s3Client.service';
import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';
import { ModalContrasenaComponent } from '../modal-contrasena/modal-contrasena.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  opened = false;
  active = false;
  form: FormGroup = this.fb.group({
  });

  foto : string = "../../../../assets/image/avatar.png 1 1.png"
  user: string
  consultante: Consultantes = new Consultantes();
  constructor(private fb: FormBuilder,private authService: AuthService, private s3Service: S3ClientService,
     private consultatesService: ConsultantesService, private dialog: MatDialog) {
    this.authService.protected().toPromise().then(resp => {
      this.consultante.id = resp.idConsultante;
      this.consultatesService.list(this.consultante).toPromise().then(res => {
        this.user = res[0].nombre +" "+ res[0].apellidos
        if(res[0].imagen!=undefined && res[0].imagen!=null){
          this.s3Service.search(res[0].imagen).subscribe((respSearch:any)=>{
            this.s3Service.download(respSearch.path).subscribe((respDo:any)=>{
              this.foto="data:image/gif;base64,"+respDo.base64;
              const imagen = document.getElementById('porfile') as HTMLImageElement;
              imagen.src=this.foto;
            })
          })
        } 
      });
    });
  }


  ngOnInit(): void {
  }

  activar(): void {
    this.active = true;
  }

  open() {
    console.log("opened-->",this.opened);
    this.opened = !this.opened;
  }

  openModal(){
    const dialogRef = this.dialog.open(ModalContrasenaComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
