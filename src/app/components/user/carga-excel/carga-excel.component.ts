import { Component, OnInit } from '@angular/core';
import { CargaExcelService } from 'src/app/core/services/cargaExcel.service';

@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.css']
})
export class CargaExcelComponent implements OnInit {

  constructor(private cargaExcelService: CargaExcelService) { }

  ngOnInit(): void {
  }

  carga():void{
    const file = document.getElementById('excel') as HTMLInputElement;
    if(file.files[0].name.includes('xlsx')){
      const formData = new FormData();
      formData.append('file', file.files[0]);
      this.cargaExcelService.upload(formData).subscribe((resp:any) =>{
        console.log('rta-->',resp)
      });
    }else{
      alert("por favor cargue solo archivos excel")
    }
  }
}
