import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'snHabList'})
export class SnHabListPipe implements PipeTransform {
  transform(sn: any): string {
    return sn ? 'Si' : 'No';
  }
}
