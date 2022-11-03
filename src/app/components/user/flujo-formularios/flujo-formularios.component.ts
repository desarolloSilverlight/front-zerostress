import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FlujosFormularios } from 'src/app/core/models/FlujosFormularios';
import { FlujosFormulariosService } from 'src/app/core/services/flujosFormularios.service';

@Component({
  selector: 'app-flujo-formularios',
  templateUrl: './flujo-formularios.component.html',
  styleUrls: ['./flujo-formularios.component.css']
})
export class FlujoFormulariosComponent implements OnInit {
  
  Sincontenido= false;

  displayedColumns: string[] = ['fecha', 'transaccion', 'respuesta', 'puntaje'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  singularValue=''
  dataSource = new MatTableDataSource();

  form: FormGroup = this.fb.group({
    fecha: [null, Validators.required],
    transaccion: [null, Validators.required],
    respuesta: [null, Validators.required],
    puntaje: [null, Validators.required]
  });

  Flujo: FlujosFormularios = new FlujosFormularios;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute,
     private FlujoFormulariosService: FlujosFormulariosService) {
    this.actRoute.params.subscribe(params => {
      this.Flujo.idFormularioGenerador=params.id;
      this.FlujoFormulariosService.list(this.Flujo).toPromise().then(resp=>{
        if(resp.length!=0){
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = resp;
        }else{
          this.Sincontenido=true;
        }
      });     
    });
   }

  ngOnInit(): void {
  }

}
