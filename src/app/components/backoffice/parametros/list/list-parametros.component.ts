import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {Parametros} from '../../../../core/models/Parametros';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-parametros',
  templateUrl: './list-parametros.component.html',
  styleUrls: ['./list-parametros.component.css']
})
export class ListParametrosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idTpParametro', 'descripcion', 'alfanumerico', 'numerico', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private parametrosService: ParametrosService, private actRoute: ActivatedRoute) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    const param = new Parametros();
    param.idTpParametro = this.parent;
    this.parametrosService.list(param).toPromise().then(resp => {
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
    const t: Parametros = new Parametros();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
