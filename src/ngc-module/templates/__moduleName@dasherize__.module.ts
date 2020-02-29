import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

// **************************************************
// Components & Services


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  exports: []
})
export class <%= classify(moduleName) %>Module { }
