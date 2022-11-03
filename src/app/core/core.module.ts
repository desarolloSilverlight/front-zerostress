import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlyDirective} from './directives/only.directive';
import {PipesModule} from './pipes/pipes.module';


@NgModule({
  declarations: [OnlyDirective],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    OnlyDirective,
    PipesModule
  ]
})
export class CoreModule {
}
