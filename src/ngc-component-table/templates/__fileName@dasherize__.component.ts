
import { Component} from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-table',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>TableComponent {
  @Input() items: T[];
  @Input() classNames: string[];
}
