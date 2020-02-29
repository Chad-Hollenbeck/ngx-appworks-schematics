export class <%= classify(name) %>VM {
  id: string;

  modifiedBy: string;
  isActive: boolean;
  <% if (dates == 'crud') { %>createDate: string;
  updateDate: string;  <% } %>
    <% if (dates == 'scd') { %>startDate: string
  endDate: string;  <% } %>

  // Constructor
  constructor(){
    this.id = null;


    this.isActive = true;
    <% if(dates == 'crud') { %>this.createDate = new Date().toISOString();
    this.updateDate = new Date().toISOString();    <% } %>
    <% if(dates == 'scd') { %>this.startDate = new Date().toISOString();
    this.endDate = null;    <% } %>
  }
}
