import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-<%= dasherize(fileName)%>-manage',
  templateUrl: './<%= dasherize(fileName) %>-manage.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>-manage.component.scss']
})
export class <%= classify(fileName) %>Page implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject < boolean > = new ReplaySubject(1);

  constructor() {
    this.loading = true;
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
