import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {Respuestas} from '../../../../core/models/Respuestas';
import {RespuestasService} from '../../../../core/services/respuestas.service';

@Component({
  selector: 'app-list-respuestas',
  templateUrl: './list-respuestas.component.html',
  styleUrls: ['./list-respuestas.component.css']
})
export class ListRespuestasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idPregunta', 'descripcion', 'puntaje', 'orden', 'retornaA', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  singularValue = '';
  parent: number;
  rts = []

  constructor(private respuestasService: RespuestasService, private actRoute: ActivatedRoute) {
    this.parent = this.actRoute.snapshot.params.parent;
  }

  ngOnInit(): void {
    const p = new Respuestas();
    p.idPregunta = this.parent;
    this.respuestasService.list(p).toPromise().then(resp => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      resp.forEach(element => {
        if (element.idPregunta == this.parent) {
          this.rts.push(element)
        }
      });
      this.dataSource.data = this.rts;
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
    const t: Respuestas = new Respuestas();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }
}
