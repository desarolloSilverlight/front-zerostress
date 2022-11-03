import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {Notificaciones} from '../../../../core/models/Notificaciones';
import {NotificacionesService} from '../../../../core/services/notificaciones.service';

@Component({
  selector: 'app-list-notificaciones',
  templateUrl: './list-notificaciones.component.html',
  styleUrls: ['./list-notificaciones.component.css']
})
export class ListNotificacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idTpNotificacion', 'correos', 'envioInmediato', 'fechaEnvio', 'horaEnvio', 'usuario', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private notificacionesService: NotificacionesService, private actRoute: ActivatedRoute) {
     this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.notificacionesService.listVi(new Notificaciones()).toPromise().then(resp => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = resp;

      console.log(this.dataSource.data)
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = new MatTableDataSource().filterPredicate;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    const t: Notificaciones = new Notificaciones();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
