export class <%= classify(name) %>VM {
  id: string;

  modifiedBy: string;
  isActive: boolean;
  <% if(!isSCD) { %>createDate: string;
  updateDate: string;  <% } %>
  <% if(isSCD) { %>startDate: string
  endDate: string;  <% } %>

  // Constructor
  constructor(){
    this.id = null;


    this.isActive = true;
    <% if(!isSCD) { %>this.createDate = new Date().toISOString();
    this.updateDate = new Date().toISOString();    <% } %>
    <% if(isSCD) { %>this.startDate = new Date().toISOString();
    this.endDate = null;    <% } %>
  }
}
