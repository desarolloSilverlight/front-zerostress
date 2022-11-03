import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {BaseNotificaciones} from '../../../../core/models/BaseNotificaciones';
import {BaseNotificacionesService} from '../../../../core/services/baseNotificaciones.service';
import {CargaExcelService} from 'src/app/core/services/cargaExcel.service';
import {MatDialog} from '@angular/material/dialog';
import {CargaComponent} from '../../cargaExcel/carga/carga.component';

@Component({
  selector: 'app-list-baseNotificaciones',
  templateUrl: './list-baseNotificaciones.component.html',
  styleUrls: ['./list-baseNotificaciones.component.css']
})
export class ListBaseNotificacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'orden', 'texto', 'idBaseTpNotificacion', 'fechaCreacion', 'usuario', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;
  activo = false;
  Eleccion = ' ';

  constructor(private baseNotificacionesService: BaseNotificacionesService, private actRoute: ActivatedRoute,
              private dialog: MatDialog) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.baseNotificacionesService.list(new BaseNotificaciones()).toPromise().then(resp => {
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


  changeFilter(event: MatSelectChange) {
    this.dataSource.filterPredicate = General.createFilter(event.value);
  }

  singularFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.singularValue === undefined || this.singularValue == null || this.singularValue.trim() === '') {
      return null;
    }
    console.log(filterValue, this.singularValue);
    const t: BaseNotificaciones = new BaseNotificaciones();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }

  OpenDialog(): void {
    const dialogRef = this.dialog.open(CargaComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }
}
