import { ActivatedRoute,ParamMap,Router } from '@angular/router';
import { APP_ROUTE_NAMES } from '@app/app.routes.names';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';
import { <%= classify(fileName) %>Service } from '../services/<%= dasherize(fileName) %>.service';
import * as _ from 'lodash';
import { ReplaySubject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

@Component({
  selector: 'app-<%= dasherize(fileName)%>-manage',
  templateUrl: './<%= dasherize(fileName) %>-manage.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>-manage.component.scss']
})
export class <%= classify(fileName) %>ManageComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject < boolean > = new ReplaySubject(1);

  loading: boolean;
  loadingDocuments: boolean;
  uploading: boolean;

  curTab = 'general';

  selectedId: string;
  selectedItem: I<%= classify(fileName) %>;
  isNew: boolean;

  constructor(private appService: AppService, private toastr: ToastrService, private <%= camelize(fileName) %>Service: <%= classify(fileName) %>Service, private activeRoute: ActivatedRoute, private router: Router) {
    this.appService.pageTitle = '<%= classify(fileName) %> Manage';
    this.loading = true;
  }

  ngOnInit() {
    this.activeRoute.paramMap.pipe(takeUntil(this.destroyed$)).subscribe(
      (value: ParamMap) => {
        if (value.keys.length === 0) {
          this.toastr.error('No id found');
        }

        this.selectedId = value.get('id');
        this.isNew = (this.selectedId === 'new');

        if (!this.isNew) {
          this.<%= camelize(fileName) %>Service.get(this.selectedId).pipe(takeUntil(this.destroyed$)).subscribe(
            (item: I<%= classify(fileName) %>) => {
              this.selectedItem = item;
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
        }
      }
    );

    // Check for query params for tab control
  this.activeRoute.queryParamMap.pipe(takeUntil(this.destroyed$)).subscribe(
      (value: ParamMap) => {
        if (value.get('tab')) {
          this.curTab = value.get('tab');
        } else {
          this.curTab = 'general';
        }
      }
    );
  }

  changeTab(newVal: string) {
    this.router.navigate(['/', APP_ROUTE_NAMES.<%= classify(moduleName).replace(/-/g, '_').toUpperCase() %>, this.selectedId], { queryParams: { tab: newVal } });
  }

  onSave(id: string){
    this.router.navigate(['/', APP_ROUTE_NAMES.<%= classify(moduleName).replace(/-/g, '_').toUpperCase() %>, id]);
  }



}
