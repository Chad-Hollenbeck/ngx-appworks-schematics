import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { <%= uppercase(moduleName) %> _ROUTE_NAMES } from './<%= (moduleName) %>.routes.names';


export const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(moduleName) %>RoutingModule { }
