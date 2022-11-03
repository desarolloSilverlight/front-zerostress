import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {CabReportesParam} from '../../../../core/models/CabReportesParam';
import {CabReportesParamService} from '../../../../core/services/cabReportesParam.service';

@Component({
  selector: 'app-list-cabReportesParam',
  templateUrl: './list-cabReportesParam.component.html',
  styleUrls: ['./list-cabReportesParam.component.css']
})
export class ListCabReportesParamComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idReporte', 'nombre', 'tpParametro', 'requerido', 'maximo', 'minimo', 'txAyuda', 'nombreTabla', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();
  datos = []
  singularValue = '';
  parent: number;

  constructor(private cabReportesParamService: CabReportesParamService, private actRoute: ActivatedRoute) {
     this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    this.cabReportesParamService.list(new CabReportesParam()).toPromise().then(resp => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      resp.forEach(element =>  {
        if (element.idReporte==this.parent){
          this.datos.push(element);
        }
      });
      this.dataSource.data=this.datos;
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
    const t: CabReportesParam = new CabReportesParam();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
