// *: DO NOT REMOVE THE //{} COMMENTS.  `
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { <%= uppercase(moduleName) %>_ROUTE_NAMES } from './<%= (moduleName) %>.routes.names';

// *: Components
//{COMPONENT_IMPORT}

// *: Routes
export const routes: Routes = [
//{COMPONENT_ROUTE}
];

// *: Module
@NgModule({
  declarations: [
    RouterModule.forChild(routes),
    //{COMPONENT_DECLARATION}
  ],
  exports: [
    RouterModule,
    //{MODULE_EXPORT}
  ]
})
export class <%= classify(moduleName) %>RoutingModule { }
