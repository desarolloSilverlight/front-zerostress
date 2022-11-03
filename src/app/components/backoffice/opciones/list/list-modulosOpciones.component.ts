import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ModuloOpcioneService} from '../../../../core/services/moduloOpcion.service';
import {ModuloOpcion} from '../../../../core/models/ModuloOpcion';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-modulos',
  templateUrl: './list-modulosOpciones.component.html',
  styleUrls: ['./list-modulosOpciones.component.css']
})
export class ListModulosOpcionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'modulo', 'descripcion', 'link', 'titulo', 'orden', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private moduloOpcionService: ModuloOpcioneService, private actRoute: ActivatedRoute) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    const moduloOpcion = new ModuloOpcion();
    moduloOpcion.idModulo = this.parent;
    this.moduloOpcionService.listVi(moduloOpcion).toPromise().then(resp => {
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
    const t: ModuloOpcion = new ModuloOpcion();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
