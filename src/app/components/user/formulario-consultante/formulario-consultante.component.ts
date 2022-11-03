import { Component, OnInit, ViewChild } from '@angular/core';
import { FormulariosConsultante } from 'src/app/core/models/FormulariosConsultante';
import { FormulariosConsultanteService } from 'src/app/core/services/formulariosConsultante.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormulariosService } from 'src/app/core/services/formularios.service';
import { MatSelectChange } from '@angular/material/select';
import { General } from 'src/app/core/constants/General';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-consultante',
  templateUrl: './formulario-consultante.component.html',
  styleUrls: ['./formulario-consultante.component.css']
})
  
export class FormularioConsultanteComponent implements OnInit {

  displayedColumns: string[] = ['idFormulario', 'orden', ' '];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  formularios = [];
  formul = [];
  singularValue=''
  constructor(private formulariosConsultanteService: FormulariosConsultanteService, 
    private authService: AuthService, private formulariosService: FormulariosService) {

   }

  Fconsultante : FormulariosConsultante = new FormulariosConsultante()

  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp =>{
      this.Fconsultante.idConsultante = resp.idConsultante;
      this.formulariosConsultanteService.listVi(this.Fconsultante).pipe(map(orden=>{
        orden.sort((a,b)=>{
          return a.orden - b.orden;
        })
        return orden;
      })).toPromise().then(resp => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = resp;
        for (const iterator of resp) {
          if(this.formularios.indexOf(iterator.idFormulario)==-1){
            this.formulariosService.get(iterator.idFormulario).toPromise().then(resp => {
              this.formul.push(resp);
            });
          }
          this.formularios.push(iterator.idFormulario);       
        }
      });

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
    const t: FormulariosConsultante = new FormulariosConsultante();
    t[this.singularValue] = filterValue;
    this.dataSource.filter = JSON.stringify(t);
    this.dataSource.filterPredicate = General.createFilter(this.singularValue);
  }

}
