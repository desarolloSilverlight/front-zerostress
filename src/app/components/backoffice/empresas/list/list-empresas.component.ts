import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ModuloOpcion} from '../../../../core/models/ModuloOpcion';
import {ActivatedRoute} from '@angular/router';
import {EmpresaService} from '../../../../core/services/empresa.service';
import {Empresa} from '../../../../core/models/Empresa';
import {Invitaciones} from '../../../../core/models/Invitaciones';
import {InvitacionesService} from '../../../../core/services/invitaciones.service';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {Notificaciones} from '../../../../core/models/Notificaciones';
import {NotificacionesService} from '../../../../core/services/notificaciones.service';

@Component({
  selector: 'app-list-modulos',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css']
})
export class ListEmpresasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nit', 'razonSocial', 'email', 'direccion', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private empresaService: EmpresaService, private actRoute: ActivatedRoute, private invitacionService: InvitacionesService,
              private notificacionService: NotificacionesService) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.empresaService.list(new Empresa()).toPromise().then(resp => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = resp;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = new MatTableDataSource().filterPredicate;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generarInvitacion(empresa: Empresa) {
    const length = 8;
    let code = '';
    const abecedario: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '&', '#', '@'];
    for (let i = 0; i < length; i++) {
      const numeroAleatorio = parseInt(String(Math.random() * abecedario.length), 0);
      code += abecedario[numeroAleatorio];
    }
    const invitacion = new Invitaciones();
    invitacion.idEmpresa = empresa.id;
    invitacion.codigoInvitacion = code.toUpperCase();
    this.invitacionService.insert(invitacion).toPromise().then(resp => {
      Swal.fire({
        title: Mensajes.titleSuccess,
        icon: 'success',
        text: `Su codigo de invitacion es ${resp.codigoInvitacion} escribe a continucion el correo al que quieres enviarlo`,
        confirmButtonText: 'Enviar',
        input: 'email'
      }).then(r => {
        const notificacion = new Notificaciones();
        notificacion.idTpNotificacion = 2;
        notificacion.correos = String(r.value);
        notificacion.usuario = String(r.value);
        notificacion.envioInmediato = true;

        notificacion.variables = JSON.stringify({
          empresa: empresa.razonSocial,
          link: `${window.location.protocol}//${window.location.hostname}${window.location.port !== '' ? ':' + window.location.port : ''}/registro`,
          codigoInvitacion: resp.codigoInvitacion
        });
        this.notificacionService.insert(notificacion).toPromise().then(re => {
          Swal.fire({
            icon: 'success',
            text: 'Correo ha sido enviado'
          });
        });
      });
    });
  }


  changeFilter(event: MatSelectChange) {
    this.dataSource.filterPredicate = General.createFilter(event.value);
  }

  singularFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.singularValue === undefined || this.singularValue == null || this.singularValue.trim() === '') {
      return null;
    }
    console.log(filterValue, this.singularValue);
    const t: ModuloOpcion = new ModuloOpcion();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
