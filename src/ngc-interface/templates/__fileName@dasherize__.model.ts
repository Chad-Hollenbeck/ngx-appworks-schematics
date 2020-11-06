

<% if (useClass) {%>
export class <%= classify(fileName) %>VM extends IBaseModel {

}
<% } else { %>
export interface I<%= classify(fileName) %> extends IBaseModel {

}
export const I<%= classify(fileName).toUpperCase() %>_DEFAULTS : I<%= classify(fileName) %> = {
  id: null,
  isActive: true
}
<% } %>
