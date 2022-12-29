import { Component } from '@angular/core';
import { IBreadcrumb } from '@app/core/layout/page-header/models/breadcrumb.interface';

@Component({
  selector: 'app-<%= dasherize(fileName)%>',
  templateUrl: './<%= dasherize(fileName) %>.page.html'
})
export class <%= classify(fileName) %>Page {

  breadcrumbs: IBreadcrumb[];

  constructor() {
  }

  buildBreadcrumbs() {
    this.breadcrumbs = [
      {
        url: '/',
        order: 0,
        active: false,
        text: 'Home'
      },
      {
        url: '',
        order: 1,
        active: false,
        text: 'Prev_Page'
      },
      {
        url: '',
        order: 2,
        active: true,
        text: 'Current_Page'
      },
    ];
  }

}
