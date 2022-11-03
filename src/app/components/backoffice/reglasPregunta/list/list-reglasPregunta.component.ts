import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {ReglasPregunta} from '../../../../core/models/ReglasPregunta';
import {ReglasPreguntaService} from '../../../../core/services/reglasPregunta.service';

@Component({
  selector: 'app-list-reglasPregunta',
  templateUrl: './list-reglasPregunta.component.html',
  styleUrls: ['./list-reglasPregunta.component.css']
})
export class ListReglasPreguntaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tpCondicion', 'valor', 'minValor', 'maxValor', 'retornaA', 'idRetornaA', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;
  
  constructor(private reglasPreguntaService: ReglasPreguntaService, private actRoute: ActivatedRoute) {
     this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    const list = new ReglasPregunta();
    list.idPregunta = this.parent
    this.reglasPreguntaService.list(list).toPromise().then(resp => {
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
    const t: ReglasPregunta = new ReglasPregunta();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
