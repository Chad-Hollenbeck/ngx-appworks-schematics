
import { Component, EventEmitter, Input} from '@angular/core';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-table',
  templateUrl: './<%= dasherize(fileName) %>-table.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>TableComponent {
  @Input() items: I<%= classify(fileName) %>[];
  @Input() classNames: string[];

  @Output() onArchive = new EventEmitter <I<%= classify(fileName) %>>();
  @Output() onActivate = new EventEmitter <I<%= classify(fileName) %>>();
}
