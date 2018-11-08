import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyBoxComponent } from './easy-box/easy-box.component';
import { EasyBoxesComponent } from './easy-boxes/easy-boxes.component';
import { EasyBoxesService } from './easy-boxes.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EasyBoxComponent, EasyBoxesComponent
  ],
  providers: [
    EasyBoxesService
  ],
  exports: [
    EasyBoxComponent, EasyBoxesComponent
  ]
})
export class EasyBoxesModule { }
