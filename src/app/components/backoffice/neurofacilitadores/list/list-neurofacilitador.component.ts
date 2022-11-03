import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ModuloOpcion} from '../../../../core/models/ModuloOpcion';
import {ActivatedRoute} from '@angular/router';
import {NeurofacilitadorService} from '../../../../core/services/neurofacilitador.service';
import {Neurofacilitador} from '../../../../core/models/Neurofacilitador';

@Component({
  selector: 'app-list-modulos',
  templateUrl: './list-neurofacilitador.component.html',
  styleUrls: ['./list-neurofacilitador.component.css']
})
export class ListNeurofacilitadorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private neurofacilitadorService: NeurofacilitadorService, private actRoute: ActivatedRoute) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    const neurofacilitador = new Neurofacilitador();
    this.neurofacilitadorService.list(neurofacilitador).toPromise().then(resp => {
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
