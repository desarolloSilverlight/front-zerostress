import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ParametrosService} from 'src/app/core/services/parametros.service';
import {UsrPartCuerpoService} from "../../../core/services/usrPartCuerpo.service";
import {UsrCausaEstresService} from "../../../core/services/usrCausaEstres.service";
import {GlobalsUser} from "../../../core/globals/globalsUser";
import {UsrCausaEstres} from "../../../core/models/UsrCausaEstres";
import {UsrPartCuerpo} from "../../../core/models/UsrPartCuerpo";
import {ConsultantesService} from "../../../core/services/consultantes.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmacionComponent} from "../modal-confirmacion/modal-confirmacion.component";
import {Contenidos} from "../../../core/models/Contenidos";
import {Consultas} from "../../../core/models/Consultas";
import {ModalvideoComponent} from "../modalvideo/modalvideo.component";
import {ContenidosService} from "../../../core/services/contenidos.service";
import {ConsultasService} from "../../../core/services/consultas.service";
import {ModalFinalizacionComponent} from "../modal-finalizacion/modal-finalizacion.component";

@Component({
  selector: 'app-diario-vivir',
  templateUrl: './diario-vivir.component.html',
  styleUrls: ['./diario-vivir.component.css']
})
export class DiarioVivirComponent implements OnInit {

  tpEstres: any = [{id: '001', descripcion: 'Analizar casi todo de manera detallada', numerico: 'A1'},
    {id: '002', descripcion: 'Orientate por la intución, los sentimientos y las emociones', numerico: 'A2'},
    {id: '003', descripcion: 'Reaccionar rápido para anticiparse', numerico: 'A3'}];
  validar = false;
  eleccion: number;
  activate: number;
  img = '../../../../assets/image/Raster';

  constructor(private parametroService: ParametrosService, private router: Router,
              private usrPartCuerpoService: UsrPartCuerpoService, private usrCausaEstresService: UsrCausaEstresService,
              public globals: GlobalsUser, private consultanteService: ConsultantesService, private dialog: MatDialog,
              private contenidoService: ContenidosService, private consultaService: ConsultasService) {
    console.log(globals);
  }

  ngOnInit(): void {
  }

  cambioApariencia(id: number) {
    this.validar = true;
    this.eleccion = id;
    console.log('presionado ', id);
    this.tpEstres.forEach(element => {
      if (element.id !== id) {
        const buttonB = document.getElementById(String(element.id)) as HTMLButtonElement;
        buttonB.setAttribute('class', 'btn-tab');
        const divB = document.getElementById(String(element.numerico)) as HTMLDivElement;
        divB.setAttribute('class', 'content-elemts');
      } else {
        const button = document.getElementById(String(id)) as HTMLButtonElement;
        const div = document.getElementById(String(element.numerico)) as HTMLDivElement;
        div.setAttribute('class', 'content-elemts-cambio');
        button.setAttribute('class', 'btn-tab-cambio');
        this.activate = id;
      }
    });

  }


  next() {

    const consultante = this.globals.consultante;
    consultante.tpCerebro = this.globals.objReconocimiento.tpCerebero;
    consultante.dVivir = String(this.eleccion);
    consultante.primerIngreso = false;
    this.consultanteService.save(consultante).toPromise().then(() => {
      //this.dialog.open(ModalConfirmacionComponent).afterClosed().toPromise().then(() => {
      const contenido = new Contenidos();
      contenido.orden = 0;
      contenido.idTemaConsulta = this.globals.temaConsulta.id;
      const consulta = new Consultas();
      consulta.idConsultante = this.globals.consultante.id;
      consulta.fecha = new Date();
      const dialog = this.dialog.open(ModalFinalizacionComponent);
      this.consultaService.insert(consulta).toPromise().then((r) => {
      dialog.close();
        for (let i = 0; i < this.globals.objReconocimiento.partesCuerpo.length; i++) {
          const usrPartCuerpo = new UsrPartCuerpo();
          usrPartCuerpo.idPartCuerpo = this.globals.objReconocimiento.partesCuerpo[i];
          usrPartCuerpo.idZonaCuerpo = null;
          // usrPartCuerpo.intensidadZona = Number(this.globals.objReconocimiento.intensidad[i].split(',')[1]);
          usrPartCuerpo.intensidadZona = 0;
          usrPartCuerpo.orden = i + 1;
          usrPartCuerpo.idConsulta = r.id;
          this.usrPartCuerpoService.insert(usrPartCuerpo).toPromise().then();
        }

        for (let i = 0; i < this.globals.objReconocimiento.spCausas.length; i++) {
          const usrCausaEstres = new UsrCausaEstres();
          usrCausaEstres.idConsultante = this.globals.consultante.id;
          usrCausaEstres.idSbCausaEstres = this.globals.objReconocimiento.spCausas[i];
          usrCausaEstres.orden = i + 1;
          usrCausaEstres.idConsulta = r.id;
          this.usrCausaEstresService.insert(usrCausaEstres).toPromise().then();
        }

        
        this.globals.consulta = r;
        this.contenidoService.list(contenido).toPromise().then(res => {
          this.router.navigateByUrl('/app/misActividades').then(() => {
           /* this.dialog.open(ModalvideoComponent, {
              data: {id: res[0].id, idConsulta: r.id},
              disableClose: true,
              width: '60%'
            }).afterClosed().toPromise().then(() => {
              location.reload();
            });*/
            location.reload();
          });
        });
      });
      // })
    });
  }
}
