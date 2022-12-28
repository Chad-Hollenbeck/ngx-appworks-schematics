import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>.component.scss']
})
export class <%= classify(fileName) %> Component implements OnInit, OnDestroy {

  // Input properties from parent
  @Input() myProperty: any;

  // Output events
  @Output() onAction = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.loading = true;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
