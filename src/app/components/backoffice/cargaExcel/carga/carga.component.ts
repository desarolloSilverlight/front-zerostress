import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {DateRange} from '@angular/material/datepicker';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CargaExcelService} from 'src/app/core/services/cargaExcel.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  Eleccion = '';
  activo = false;

  constructor(private dialogReff: MatDialogRef<CargaComponent>,
              private cargaExcelService: CargaExcelService) {
  }

  ngOnInit(): void {
  }

  activarCarga(event: Event): void {
    console.log('igfygvhjb', this.Eleccion, ' njnj');
    const sp = document.getElementById('sp') as HTMLSelectElement;
    console.log(sp.value);
    if (sp.value != undefined) {
      this.Eleccion = sp.value;
      this.activo = true;
      console.log(this.activo);
    }
  }

  carga(): void {
    const file = document.getElementById('excel') as HTMLInputElement;
    if (file.files[0].name.includes('xlsx')) {
      const formData = new FormData();
      console.log(this.Eleccion);
      formData.append('file', file.files[0]);
      formData.append('sp', this.Eleccion);
      Swal.showLoading();
      this.cargaExcelService.upload(formData).subscribe((resp: any) => {
        console.log('rta-->', resp);
        Swal.close();
        Swal.fire({
          icon: 'success',
          text: 'Se ha cargado exitosamente ' + resp.contenido.length + ' resgistos'
        });
      }, (error => {
        Swal.fire({
          icon: 'error',
          text: 'Error cargando archivo'
        });
      }));
    } else {
      Swal.fire({
        icon: 'error',
        text: 'por favor cargue solo archivos excel'
      });
    }
  }

  onClickNO(): void {
    if (this.activo) {
      this.carga();
      this.dialogReff.close();
    }
  }

}
