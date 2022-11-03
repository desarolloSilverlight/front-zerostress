import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ConsultasService} from '../../../core/services/consultas.service';
import {Consultas} from '../../../core/models/Consultas';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {Router} from '@angular/router';
import {TemasConsultaService} from '../../../core/services/temasConsulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.css']
})
export class MisConsultasComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['fecha', 'tema', 'porcentaje', ' '];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  singularValue = '';

  constructor(private consultaService: ConsultasService, private globals: GlobalsUser,
              private router: Router, private temaConsultaService: TemasConsultaService) {
  }

  ngOnInit(): void {
    const consulta = new Consultas();
    this.globals.loadedClaims.subscribe(r => {
      if (r) {
        consulta.idConsultante = this.globals.claimsUser.idConsultante;
        this.consultaService.listVi(consulta).toPromise().then(resp => {
          this.dataSource.data = resp;
        });
      }
    });
  }

  generarConsulta() {
    const consulta = new Consultas();
    consulta.idConsultante = this.globals.claimsUser.idConsultante;
    consulta.fecha = new Date();
    this.consultaService.insert(consulta).toPromise().then((r) => {
      this.globals.consulta = r;
      this.router.navigate(['/app', 'temas']);
    });
  }

  irConsulta(element: Consultas) {
    this.consultaService.isInitialized(element.id).toPromise().then(r => {
      if (r.result === 0) {
        this.router.navigate(['/app', 'temas']);
        this.globals.consulta = element;
      } else {
        this.globals.consulta = element;
        this.consultaService.irContenido(element.id).toPromise().then(res => {
          this.temaConsultaService.get(res.tema).toPromise().then(resp => {
            this.globals.temaConsulta = resp;
            this.globals.consultaRes = res;
            if (res.nextcontenido === null) {
              Swal.fire({
                icon: 'warning',
                text: 'Ya has completado esta actividad por hoy, vuelve mañana'
              });
            } else {
              this.router.navigate(['/app', 'contenido', res.nextcontenido]);
            }
          });
        });
      }
    });
  }

}
