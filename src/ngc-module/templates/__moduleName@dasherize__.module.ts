import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
<% if (routing) { %>import { <%= classify(moduleName) %>RoutingModule } from './routes/<%= moduleName %>.routes.module';<% } %>


// **************************************************
// Components & Services
//{COMPONENT_IMPORT}


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    <% if(routing) { %> <%= classify(moduleName) %>RoutingModule,<% } %>
    //{MODULE_IMPORT}
  ],
  exports: [
    //{MODULE_EXPORT}
  ]
})
export class <%= classify(moduleName) %>Module { }
