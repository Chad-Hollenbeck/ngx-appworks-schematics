import { IBaseModelVM } from '@app/shared/+firebase-crud/models/base.model';


<% if (useClass) {%>
export class <%= classify(fileName) %>VM extends IBaseModelVM {

}
<% } else { %>
export interface I<%= classify(fileName) %> extends IBaseModelVM {

}
export const <%= classify(fileName).toUpperCase() %>_DEFAULTS : I<%= classify(fileName) %> = {
  id: null,
  isActive: true
}
<% } %>
