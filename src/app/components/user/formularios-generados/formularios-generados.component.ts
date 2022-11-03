import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormulariosGenerados } from 'src/app/core/models/FormulariosGenerados';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormulariosGeneradosService } from 'src/app/core/services/formulariosGenerados.service';

@Component({
  selector: 'app-formularios-generados',
  templateUrl: './formularios-generados.component.html',
  styleUrls: ['./formularios-generados.component.css']
})
export class FormulariosGeneradosComponent implements OnInit {
  
  displayedColumns: string[] = ['usuario', 'fecha', ' '];
  generados= []
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  singularValue=''
  dataSource = new MatTableDataSource();

  constructor(private formularioGeneradoService: FormulariosGeneradosService, private authService: AuthService) { }
  
  FormGenerado : FormulariosGenerados = new FormulariosGenerados()
  
  ngOnInit(): void {
    this.authService.protected().toPromise().then(resp =>{
      this.FormGenerado.usuario=resp.identity;
      console.log("usuario", this.FormGenerado.usuario)
      this.formularioGeneradoService.list(this.FormGenerado).toPromise().then(resp=>{
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = resp;
        console.log("mirar", this.dataSource.data);
      });
    });

  }

}
