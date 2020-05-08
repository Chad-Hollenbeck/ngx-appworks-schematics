
import { Component} from '@angular/core';
import { T } from '../models/<%= dasherize(modelName) %>.model';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-table',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>TableComponent {
  @Input() items: T[];
  @Input() classNames: string[];
}
