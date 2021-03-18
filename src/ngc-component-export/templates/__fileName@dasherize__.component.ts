import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>.component.scss']
})
export class <%= classify(fileName) %>Component implements OnInit {
  private destroyed$: ReplaySubject < boolean > = new ReplaySubject(1);

  loading: boolean;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = '<%= classify(fileName) %>';

  }

  ngOnInit() {
    this.loading = true;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
