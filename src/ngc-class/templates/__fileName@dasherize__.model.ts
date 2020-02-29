import * as moment from 'moment';

export class <%= classify(fileName) %>VM {
  id: string;

  modifiedBy: string;

  <% if (dateType == 'crud') { %>createDate: string;
  updateDate: string;
  isActive: boolean;  <% } %>
  <% if (dateType == 'scd') { %>startDate: string;
  endDate: string;  <% } %>

  // Constructor
  constructor(){
    this.id = null;


    this.isActive = true;
    <% if (dateType == 'crud') { %>this.createDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    this.updateDate = null;
    isActive = true; }   <% } %>
    <% if (dateType == 'scd') { %>this.startDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    this.endDate = null; }    <% } %>

}
