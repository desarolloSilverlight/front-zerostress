import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TemasConsultaService} from '../../../core/services/temasConsulta.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {TemasConsulta} from '../../../core/models/TemasConsulta';
import {ContenidosService} from '../../../core/services/contenidos.service';
import {Contenidos} from '../../../core/models/Contenidos';
import {ActivatedRoute, Router} from '@angular/router';
import {CausasEstresComponent} from '../causas-estres/causas-estres.component';
import {Consultas} from "../../../core/models/Consultas";
import {ConsultasService} from "../../../core/services/consultas.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalvideoComponent} from "../modalvideo/modalvideo.component";

@Component({
  selector: 'app-temas-consulta',
  templateUrl: './temas-consulta.component.html',
  styleUrls: ['./temas-consulta.component.css']
})
export class TemasConsultaComponent implements OnInit, AfterViewInit {

  temasList: TemasConsulta[] = [];
  tema: TemasConsulta;
  active: number;
  id: number;
  @ViewChild(CausasEstresComponent, {static: false})
  causas: CausasEstresComponent;

  constructor(private temasConsultaService: TemasConsultaService, public globals: GlobalsUser, private contenidoService: ContenidosService,
              private router: Router, private actRoute: ActivatedRoute, private consultaService: ConsultasService,
              private dialog: MatDialog) {
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
    });

  }

  ngOnInit(): void {
    const temaConsulta = new TemasConsulta();
    temaConsulta.snHab = true;
    temaConsulta.idGrupo = this.id;
    this.temasConsultaService.list(temaConsulta).toPromise().then(r => {
      this.temasList = r.sort((a, b) => {
        return a.orden - b.orden;
      });
      if (this.globals.temaConsulta != null) {
        if (this.globals.temaConsulta.idGrupo == this.id) {
          setTimeout(() => {
            const radio = document.getElementById(String(this.globals.temaConsulta.id)) as HTMLInputElement;
            console.log(radio, this.globals.temaConsulta.id);
            radio.click()
          }, 500);
          //this.mostrarCheck(this.globals.temaConsulta.id, this.globals.temaConsulta);
        }
      }
    });
  }

  ngAfterViewInit(): void {

  }

  runTema() {
    console.log('tema ', this.tema.id, this.tema);
    const contenido = new Contenidos();
    contenido.orden = 1;
    contenido.idTemaConsulta = this.tema.id;
    this.globals.temaConsulta = this.tema;
    // if (this.globals.consultante.primerIngreso) {
    this.router.navigateByUrl('/app/spCausaEstres');

    // } else {
    //   const consulta = new Consultas();
    //   consulta.idConsultante = this.globals.claimsUser.idConsultante;
    //   consulta.fecha = new Date();
    //   this.consultaService.insert(consulta).toPromise().then((r) => {
    //     this.globals.consulta = r;
    //     this.contenidoService.list(contenido).toPromise().then(res => {
    //       this.router.navigateByUrl('/app/misActividades').then(() => {
    //         this.dialog.open(ModalvideoComponent, {
    //           data: {id: res[0].id}
    //         });
    //       });
    //     });
    //   });
    //
    // }

  }


  mostrarCheck(id: any, tema: TemasConsulta) {
    this.tema = tema;
    this.active = id;
    console.log('id entrante ', id);
    this.temasList.forEach(element => {
      if (element.id !== id) {
        console.log('id que no ', element.id);
        const radio = document.getElementById(String(element.id)) as HTMLInputElement;
        radio.checked = false;
      } else {
        const radio = document.getElementById(String(element.id)) as HTMLInputElement;
        radio.checked = true;
        console.log("siii: ", radio.checked)
      }
    });
  }
}
