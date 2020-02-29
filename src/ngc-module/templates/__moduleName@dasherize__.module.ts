import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
<% if (routing) { %>import { <%= classify(moduleName) %>RoutingModule } from './routes/<%= moduleName %>.routes.module';<% } %>


// **************************************************
// Components & Services


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    <% if(routing) { %> <%= classify(moduleName) %>RoutingModule,<% } %>
  ],
  exports: []
})
export class <%= classify(moduleName) %>Module { }
