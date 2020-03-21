import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

import { <%= uppercase(moduleName) %>_ROUTE_NAMES } from './routes/<%= (moduleName) %>.routes.names';


// *: Components
//{COMPONENT_IMPORT}

// *: Routes
export const routes: Routes = [
  //{COMPONENT_ROUTE}
];


@NgModule({
  declarations: [
    //{COMPONENT_DECLARATION}
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    //{MODULE_IMPORT}
  ],
  exports: [
    //{MODULE_EXPORT}
  ]
})
export class <%= classify(moduleName) %>Module { }
