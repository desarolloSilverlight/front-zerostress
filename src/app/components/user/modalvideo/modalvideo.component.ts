import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalEvaluarComponent} from '../modal-evaluar/modal-evaluar.component';
import {FlujoConsulta} from '../../../core/models/FlujoConsulta';
import {Contenidos} from '../../../core/models/Contenidos';
import Swal from 'sweetalert2';
import {Notificaciones} from '../../../core/models/Notificaciones';
import {DialogRatingComponent} from '../contenido/contenido.component';
import {FlujoConsultaService} from '../../../core/services/flujoConsulta.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {ContenidosService} from '../../../core/services/contenidos.service';
import {S3ClientService} from '../../../core/services/s3Client.service';
import {NotificacionesService} from '../../../core/services/notificaciones.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalCalificacionComponent} from '../modal-calificacion/modal-calificacion.component';
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-modalvideo',
  templateUrl: './modalvideo.component.html',
  styleUrls: ['./modalvideo.component.css']
})
export class ModalvideoComponent implements OnInit, AfterViewInit {
  flujoConsulta: FlujoConsulta;
  id: number;
  contenido: Contenidos;
  base64: string;
  mimetype: string;
  url;
  imagen: string;
  flujo: FlujoConsulta;
  video;
  @ViewChild('audioElement')
  audioElement: HTMLAudioElement;
  load:boolean=false;

  audio: HTMLAudioElement;

  constructor(private contenidoService: ContenidosService, private dialogReff: MatDialogRef<ModalvideoComponent>,
              private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data,
              private flujoConsultaService: FlujoConsultaService, private globals: GlobalsUser,
              private s3ClientService: S3ClientService, private notifiacionService: NotificacionesService,
              private sanitizer: DomSanitizer, private router: Router) {
    console.log(data);
    this.id = data.id;
    this.imagen = data.imagen === undefined ? 'guitarra.png' : data.imagen;
    this.video = data.video;
    this.flujo = data.flujo;
  }

  ngAfterViewInit() {
    console.log(this.audioElement);
  }

  ngOnInit(): void {
    // if (this.imagen !== 'video' && this.id !== undefined) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor'
    });
    this.contenidoService.get(this.id).toPromise().then(r => {
      this.contenido = r;
      this.url = `${environment.apiEndpoint}s3/${this.contenido.link}`;
      this.url = this.sanitizer.bypassSecurityTrustUrl(this.url);
      Swal.close();
      this.load = true;
      // this.s3ClientService.download(this.contenido.link).toPromise().then(res => {
      //   this.base64 = res.base64;
      //   this.mimetype = res.mimetype;
      //   this.url = `data:${this.mimetype};base64,${this.base64}`;
      //   this.url = this.sanitizer.bypassSecurityTrustUrl(this.url);
      // });
    });
    console.log(this.audioElement);
    // }
  }

  onClickNO(): void {
    this.dialogReff.close();
  }

  Calificar(): void {

    // this.dialogReff.close();
    // const dialogRef = this.dialog.open(ModalEvaluarComponent, {});
    // dialogRef.afterClosed().subscribe(res => {
    //   console.log('calificación::::::', res);
    // });

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor'
    });
    Swal.showLoading();

    //(document.getElementById('audioElement') as HTMLAudioElement).pause();
    if (this.flujo) {

      this.flujoConsulta = new FlujoConsulta();
      this.flujoConsulta.fecha = new Date();
      this.flujoConsulta.idConsulta = this.data.idConsulta;
      this.flujoConsulta.idContenido = this.id;
      this.flujoConsulta.idTema = this.contenido.idTemaConsulta === null ?
        this.data.contenidos.find(s => s.id === this.contenido.id).idTemaConsulta : this.contenido.idTemaConsulta;
      this.flujoConsultaService.insert(this.flujoConsulta).toPromise().then(r => {
        this.flujoConsulta = r;
        Swal.close();
        this.dialog.open(ModalEvaluarComponent, {
          data: {flujoConsulta: this.flujoConsulta},
          disableClose: true,
          width: 'auto'
        }).afterClosed().subscribe(result => {
          if (this.flujoConsulta.calificacion == null) {
            this.flujoConsulta.calificacion = -1;
          }
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere Por favor'
          });
          Swal.showLoading();
          this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(res => {

            const cont = (this.data.contenidos as Contenidos[]) !== undefined ?
              (this.data.contenidos as Contenidos[]).find(s => s.id === this.contenido.id) : this.contenido;
            Swal.close();
            console.log('contenido ---> ', cont);
            if (cont.orden2 !== 0) {
              this.dialog.open(ModalCalificacionComponent, {
                width: 'auto',
                disableClose: true,
                data: {
                  flujoConsulta: res.id,
                  consulta: res.idConsulta,
                  posicion: this.data.posicion,
                  contenidos: this.data.contenidos,
                  contenido: cont
                },
              }).afterClosed().toPromise().then(() => {
                this.dialogReff.close();
              });
            }
          });
        });
      });


      this.flujoConsulta = this.flujo;
      Swal.close();
      this.dialogReff.close();



    } else {
      this.flujoConsulta = new FlujoConsulta();
      this.flujoConsulta.fecha = new Date();
      this.flujoConsulta.idConsulta = this.data.idConsulta;
      this.flujoConsulta.idContenido = this.id;
      this.flujoConsulta.idTema = this.contenido.idTemaConsulta === null ?
        this.data.contenidos.find(s => s.id === this.contenido.id).idTemaConsulta : this.contenido.idTemaConsulta;
      this.flujoConsultaService.insert(this.flujoConsulta).toPromise().then(r => {
        this.flujoConsulta = r;
        Swal.close();
        this.dialog.open(ModalEvaluarComponent, {
          data: {flujoConsulta: this.flujoConsulta},
          disableClose: true,
          width: 'auto'
        }).afterClosed().subscribe(result => {
          if (this.flujoConsulta.calificacion == null) {
            this.flujoConsulta.calificacion = -1;
          }
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere Por favor'
          });
          Swal.showLoading();
          this.flujoConsultaService.save(this.flujoConsulta).toPromise().then(res => {
            // next contenido

            // const contenido = new Contenidos();
            // contenido.orden = this.contenido.orden + 1;
            // contenido.idTemaConsulta = this.globals.temaConsulta.id;
            // this.contenidoService.list(contenido).toPromise().then(resp => {
            //   if (resp.length === 0) {
            //     Swal.fire({
            //       title: 'Has terminado por hoy'
            //     }).then(() => {
            //       const notifiacion = new Notificaciones();
            //       notifiacion.envioInmediato = true;
            //       notifiacion.correos = this.globals.consultante.email;
            //       notifiacion.usuario = this.globals.claimsUser.identity;
            //       notifiacion.idTpNotificacion = 3;
            //       notifiacion.variables = JSON.stringify({
            //         nombre: this.globals.consultante.nombre,
            //         apellidos: this.globals.consultante.apellidos,
            //         causa: this.globals.temaConsulta.descripcion,
            //         intentos: this.globals.consultaRes.intentoscompletos,
            //         repeticiones: this.globals.temaConsulta.nRepeticiones
            //       });
            //       this.notifiacionService.insert(notifiacion).toPromise().then();
            //       this.router.navigate(['/app', 'misActividades']);
            //     });
            //   } else {
            //     this.dialogReff.close();
            //     this.dialog.open(ModalvideoComponent, {
            //       data: {id: resp[0].id}
            //     });
            //   }
            // });


            const cont = (this.data.contenidos as Contenidos[]) !== undefined ?
              (this.data.contenidos as Contenidos[]).find(s => s.id === this.contenido.id) : this.contenido;
            Swal.close();
            console.log('contenido ---> ', cont);
            if (cont.orden2 !== 0) {
              this.dialog.open(ModalCalificacionComponent, {
                width: 'auto',
                disableClose: true,
                data: {
                  flujoConsulta: res.id,
                  consulta: res.idConsulta,
                  posicion: this.data.posicion,
                  contenidos: this.data.contenidos,
                  contenido: cont
                },
              }).afterClosed().toPromise().then(() => {
                this.dialogReff.close();
              });
            }
          });
        });
      });
    }

  }

}
