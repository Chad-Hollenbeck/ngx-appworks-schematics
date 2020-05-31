
import { Component} from '@angular/core';
import { I<%= classify(fileName) %> } from '../models/<%= dasheize(fileName) %>.model'
@Component({
  selector: 'app-<%= dasherize(fileName) %>-table',
  templateUrl: './<%= dasherize(fileName) %>-table.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>TableComponent {
  @Input() items: I<%= classify(fileName) %>[];
  @Input() classNames: string[];
}
