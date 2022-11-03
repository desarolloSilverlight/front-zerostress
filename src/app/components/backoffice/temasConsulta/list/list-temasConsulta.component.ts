import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {TemasConsulta} from '../../../../core/models/TemasConsulta';
import {TemasConsultaService} from '../../../../core/services/temasConsulta.service';

@Component({
  selector: 'app-list-temas-consulta',
  templateUrl: './list-temasConsulta.component.html',
  styleUrls: ['./list-temasConsulta.component.css']
})
export class ListTemasConsultaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idGrupo', 'tpEnergia', 'descripcion', 'nRepeticiones', 'tpCerebro', 'orden', 'snHab', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private temasConsultaService: TemasConsultaService, private actRoute: ActivatedRoute) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.temasConsultaService.listVi(new TemasConsulta()).toPromise().then(resp => {
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
    const t: TemasConsulta = new TemasConsulta();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
