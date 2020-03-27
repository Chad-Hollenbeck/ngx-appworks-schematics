import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= uppercase(moduleName) %>_ROUTE_NAMES } from './<%= (moduleName) %>.routes.names';


// *: Components
/*COMPONENT_IMPORT*/

// *: Routes
export const routes: Routes = [
/*COMPONENT_ROUTE*/
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class <%= classify(moduleName) %>RoutingModule { }
