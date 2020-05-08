import { IBaseModelVM } from '@app/shared/models/base.model';

<% if (useClass) {%>
export class <%= classify(fileName) %>VM extends IBaseModelVM {

}
<% } else { %>
export interface I<%= classify(fileName) %> extends IBaseModelVM {

}
<% } %>
