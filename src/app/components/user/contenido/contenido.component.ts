import {Component, Inject, OnInit} from '@angular/core';
import {ContenidosService} from '../../../core/services/contenidos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Contenidos} from '../../../core/models/Contenidos';
import {DomSanitizer} from '@angular/platform-browser';
import {FlujoConsultaService} from '../../../core/services/flujoConsulta.service';
import {FlujoConsulta} from '../../../core/models/FlujoConsulta';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {S3ClientService} from '../../../core/services/s3Client.service';
import {Notificaciones} from '../../../core/models/Notificaciones';
import {NotificacionesService} from '../../../core/services/notificaciones.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  id: number;
  contenido: Contenidos;
  height;
  width;
  flujoConsulta: FlujoConsulta;
  base64: string;
  mimetype: string;
  url;

  constructor(private contenidoService: ContenidosService, private actRoute: ActivatedRoute, private sanitizer: DomSanitizer,
              private router: Router, private flujoConsultaService: FlujoConsultaService, private globals: GlobalsUser,
              private dialog: MatDialog, private s3ClientService: S3ClientService, private notifiacionService: NotificacionesService) {
    document.body.style.backgroundColor = '#9a9a9b14';

    // this.height = window.innerHeight;
    // this.width = 1068;
    // window.addEventListener('resize', () => {
    //   // tu código aquí
    //   this.height = window.innerHeight;
    //   this.width = window.innerWidth;
    //   if (this.width < 400) {
    //     this.width = 250;
    //   } else {
    //     this.width = 1068;
    //   }
    //   console.log(this.height, this.width);
    // });
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.contenidoService.get(this.id).toPromise().then(r => {
      this.contenido = r;
      this.s3ClientService.download(this.contenido.link).toPromise().then(res => {
        this.base64 = res.base64;
        this.mimetype = res.mimetype;
        this.url = `data:${this.mimetype};base64,${this.base64}`;
        this.url = this.sanitizer.bypassSecurityTrustUrl(this.url);
      });
    });
  }

  getVideoIframe(url) {
    let video;
    let results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  redireccion(retornaA, idRetornaA) {
    if (retornaA === 1) {
      this.router.navigateByUrl('/app/contenido/' + idRetornaA);
    } else {
      // this.router.navigateByUrl('/app/formulario/' + this.contenido.idFormulario + '/' + idRetornaA);
    }
  }

  next() {
    this.flujoConsulta = new FlujoConsulta();
    this.flujoConsulta.fecha = new Date();
    this.flujoConsulta.idConsulta = this.globals.consulta.id;
    this.flujoConsulta.idContenido = this.id;
    this.flujoConsulta.idTema = this.globals.temaConsulta.id;
    this.flujoConsultaService.insert(this.flujoConsulta).toPromise().then(r => {
      this.flujoConsulta = r;
      this.dialog.open(DialogRatingComponent, {
        data: {flujoConsulta: this.flujoConsulta},
        disableClose: true
      }).afterClosed().subscribe(result => {
        if (this.flujoConsulta.calificacion == null) {
          this.flujoConsulta.calificacion = -1;
        }
        this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(r => {
          // next contenido
          const contenido = new Contenidos();
          contenido.orden = this.contenido.orden + 1;
          contenido.idTemaConsulta = this.globals.temaConsulta.id;
          this.contenidoService.list(contenido).toPromise().then(res => {
            if (res.length === 0) {
              Swal.fire({
                title: 'Has terminado por hoy'
              }).then(() => {
                const notifiacion = new Notificaciones();
                notifiacion.envioInmediato = true;
                notifiacion.correos = this.globals.consultante.email;
                notifiacion.usuario = this.globals.claimsUser.identity;
                notifiacion.idTpNotificacion = 3;
                notifiacion.variables = JSON.stringify({
                  nombre: this.globals.consultante.nombre,
                  apellidos: this.globals.consultante.apellidos,
                  causa: this.globals.temaConsulta.descripcion,
                  intentos: this.globals.consultaRes.intentoscompletos,
                  repeticiones: this.globals.temaConsulta.nRepeticiones
                });
                this.notifiacionService.insert(notifiacion).toPromise().then();
                this.router.navigate(['/app', 'misConsultas']);
              });
            } else {
              this.router.navigate(['/app', 'contenido', res[0].id]);
            }
          });
        });
      });
    });
  }

  ratingClick(clickObj: any) {
    console.log(clickObj);
    this.flujoConsulta.calificacion = clickObj.rating;
    this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(r => {
      // next contenido
      const contenido = new Contenidos();
      contenido.orden = this.contenido.orden + 1;
      contenido.idTemaConsulta = this.globals.temaConsulta.id;
      this.contenidoService.list(contenido).toPromise().then(res => {
        this.router.navigate(['/app', 'contenido', res[0].id]);
      });
    });
  }
}

@Component({
  selector: 'app-dialog-rating',
  template: `
    <h1 mat-dialog-title>Califica este contenido</h1>
    <div mat-dialog-content>
      <app-rating [rating]="0" [itemId]="1" (ratingClick)="ratingClick($event)"></app-rating>
    </div>
    <div mat-dialog-actions>
      <button mat-button [matDialogClose]="data.flujoConsulta">No gracias</button>
      <button mat-button [mat-dialog-close]="data.flujoConsulta.calificacion" cdkFocusInitial>Ok</button>
    </div>`

})
export class DialogRatingComponent {
  constructor(public dialogRef: MatDialogRef<DialogRatingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ratingClick(clickObj: any) {
    console.log(clickObj);
    this.data.flujoConsulta.calificacion = clickObj.rating;
    // this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(r => {
    //   // next contenido
    //   const contenido = new Contenidos();
    //   contenido.orden = this.contenido.orden + 1;
    //   contenido.idTemaConsulta = this.globals.temaConsulta.id;
    //   this.contenidoService.list(contenido).toPromise().then(res => {
    //     this.router.navigate(['/app', 'contenido', res[0].id]);
    //   });
    // });
  }
}
