import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {BaseTpNotificacines} from '../../../../core/models/BaseTpNotificacines';
import {BaseTpNotificacinesService} from '../../../../core/services/baseTpNotificacines.service';

@Component({
  selector: 'app-list-baseTpNotificacines',
  templateUrl: './list-baseTpNotificacines.component.html',
  styleUrls: ['./list-baseTpNotificacines.component.css']
})
export class ListBaseTpNotificacinesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'descripcion', 'diasEnvio', 'fechaCreacion', 'usuario', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;

  constructor(private baseTpNotificacinesService: BaseTpNotificacinesService, private actRoute: ActivatedRoute) {
     this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.baseTpNotificacinesService.list(new BaseTpNotificacines()).toPromise().then(resp => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(resp)
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
    const t: BaseTpNotificacines = new BaseTpNotificacines();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
