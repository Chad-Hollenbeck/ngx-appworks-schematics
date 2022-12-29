import { Component } from '@angular/core';


@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html'
})
export class <%= classify(fileName) %>Component {

  // Input properties from parent
  // @Input() myProperty: any;

  // Output events
  // @Output() action = new EventEmitter<any>();

  constructor() {
  }
}
