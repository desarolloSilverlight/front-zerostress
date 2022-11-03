import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnHabListPipe} from './snHab.pipe';
import {SafeHtmlPipe} from './sanitize.pipe';

@NgModule({
  declarations: [SnHabListPipe,
    SafeHtmlPipe],
  imports: [CommonModule],
  exports: [SnHabListPipe,
    SafeHtmlPipe]
})
export class PipesModule {

}
