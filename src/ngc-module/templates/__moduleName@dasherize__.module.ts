import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { <%= classify(moduleName) %>RoutingModule } from './routes/<%= (moduleName) %>.routes.module';


// *: Components
/*COMPONENT_IMPORT*/



@NgModule({
  declarations: [
    /*COMPONENT_DECLARATION*/
  ],
  imports: [
    SharedModule,
    <%= classify(moduleName) %>RoutingModule
    /*MODULE_IMPORT*/
  ],
  exports: [
    /*MODULE_EXPORT*/
  ]
})
export class <%= classify(moduleName) %>Module { }
