
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-table',
  templateUrl: './<%= dasherize(fileName) %>-table.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>TableComponent {
  @Input() items: I<%= classify(fileName) %>[];
  @Input() classNames: string;

  @Output() onRecover = new EventEmitter <I<%= classify(fileName) %>>();
  @Output() onArchive = new EventEmitter <I<%= classify(fileName) %>>();
}
