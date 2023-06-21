import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsrPartCuerpoService} from '../../../core/services/usrPartCuerpo.service';
import {UsrPartCuerpo} from '../../../core/models/UsrPartCuerpo';
import {ParametrosService} from '../../../core/services/parametros.service';
import {Parametros} from '../../../core/models/Parametros';
import {CalCuerpoFlujoService} from '../../../core/services/calCuerpoFlujo.service';
import {CalCuerpoFlujo} from '../../../core/models/CalCuerpoFlujo';
import {ContenidosAddConsultaService} from '../../../core/services/contenidosAddConsulta.service';
import {ContenidosAddConsulta} from '../../../core/models/ContenidosAddConsulta';
import {Contenidos} from '../../../core/models/Contenidos';
import {ConsultasService} from '../../../core/services/consultas.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-calificacion',
  templateUrl: './modal-calificacion.component.html',
  styleUrls: ['./modal-calificacion.component.css']
})
export class ModalCalificacionComponent implements OnInit {

  constructor(private dialogReff: MatDialogRef<ModalCalificacionComponent>,
              private usrPartCuerpoService: UsrPartCuerpoService, @Inject(MAT_DIALOG_DATA) public data,
              private parametrosService: ParametrosService, private calCuerpoFlujoService: CalCuerpoFlujoService,
              private contenidosAddConsultaService: ContenidosAddConsultaService, private consultaSevice: ConsultasService,
              private router: Router) {
  }

  id = ['b', 't', 'f', 'e'];
  partes: Parametros[] = [];
  calificaciones = [];

  ngOnInit(): void {
    const usrPartCuerpo = new UsrPartCuerpo();
    usrPartCuerpo.idConsulta = this.data.consulta;
    this.usrPartCuerpoService.list(usrPartCuerpo).toPromise().then(r => {
      r.forEach(p => {
        this.parametrosService.get(p.idPartCuerpo).toPromise().then(res => {
          this.partes.push(res);
          this.calificaciones.push({idcuerpo: p.id, calificacion: 0});
        });
      });
    });
  }

  onClickNO(): void {
    this.dialogReff.close();
  }

  cambioApariencia(id: string, posicion: number, calificacion: number): void {
    console.log(this.partes);    
    const a = id.split(',');
    this.calificaciones[posicion].calificacion = calificacion;
    console.log('aaaa', a);
    for (let index = 0; index < this.id.length; index++) {
      if (this.id[index].includes(a[0])) {
        const button = document.getElementById(id) as HTMLButtonElement;
        button.setAttribute('class', 'content-emote-sele');
      } else {
        const button = document.getElementById(this.id[index] + ',' + a[1]) as HTMLButtonElement;
        button.setAttribute('class', 'content-emote');
      }
    }
  }

  async next() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor'
    });
    Swal.showLoading();
    const resp = this.calificaciones.filter(r => r.calificacion === 0);
    if (resp.length === 0) {
      for (const s of this.calificaciones) {
        const cal = new CalCuerpoFlujo();
        cal.calificacion = s.calificacion;
        cal.idPartCuerpo = s.idcuerpo;
        cal.idConsulta = this.data.consulta;
        cal.idFlujoConsulta = this.data.flujoConsulta;
        await this.calCuerpoFlujoService.insert(cal).toPromise();
      }
      let count = 0;
      for (const calif of this.calificaciones) {
        count += calif.calificacion;
      }
      const result = count / this.calificaciones.length;
      console.log('promedio --->', result, 'orden -->', (this.data.contenido as Contenidos).orden2);
      if (result < 1.5 && (this.data.contenido as Contenidos).orden2 === 1) {
        const contenidoAdd = new ContenidosAddConsulta();
        contenidoAdd.idConsulta = this.data.consulta;
        contenidoAdd.idContenido = 10000;
        contenidoAdd.orden = this.data.posicion !== undefined ? this.data.posicion + 0.5 : 1.5;
        if (this.data.contenidos !== undefined && this.data.contenidos[this.data.posicion].id !== 10000) {
          await this.contenidosAddConsultaService.insert(contenidoAdd).toPromise();
        }
        if (this.data.contenidos === undefined) {
          await this.contenidosAddConsultaService.insert(contenidoAdd).toPromise().then();
        }
        await this.consultaSevice.generarRuta(this.data.consulta).toPromise().then();
        this.dialogReff.close();
      } else {
        // if (this.data.posicion !== undefined && this.data.contenidos !== undefined &&
        //   (this.data.posicion + 1) === this.data.contenidos.length) {
        //   (this.data.contenidos as Contenidos[]).forEach((r, ind) => {
        //     const conteAdd = new ContenidosAddConsulta();
        //     conteAdd.idConsulta = this.data.consulta;
        //     conteAdd.idContenido = r.id;
        //     conteAdd.orden = this.data.contenidos.length + ind + 1;
        //     if (r.id !== 10000) {
        //       this.contenidosAddConsultaService.insert(conteAdd).toPromise().then();
        //     }
        //
        //   });
        // }

        await this.consultaSevice.generarRuta(this.data.consulta).toPromise().then();
        Swal.close();
        if (result < 1.5 && (this.data.contenido as Contenidos).id === 10000) {
          Swal.fire({
            icon: 'success',
            titleText: 'Felicidades',
            text: 'Ya puedes ir a solucionar otra de tus causas de estres'
          }).then(() => {
            this.router.navigateByUrl('/app/inicio');
            this.dialogReff.close();
          });
        } else {
          this.dialogReff.close();
        }
      }
    }
  }


}
