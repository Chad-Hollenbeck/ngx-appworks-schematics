import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';
import { <%= classify(fileName) %>Service } from '../services/<%= dasherize(fileName) %>.service';
import { first } from 'rxjs/operators';
import { TableUtilityService } from '@app/shared/+utilities/services/table-utility.service';
import * as _ from 'lodash';
import { ActiveFilterStatusOptions } from '@app/shared/constants/active-filter-options.const';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-list',
  templateUrl: './<%= dasherize(fileName) %>-list.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>-list.component.scss']
})
export class <%= classify(fileName) %>ListComponent implements OnInit {

  loading: boolean;
  allItems: I<%= classify(fileName) %>[];
  displayedItems: I<%= classify(fileName) %>[];

  searchKeys = ['name'];
  perPage = 20;

  filterVal = '';
  currentPage = 1;

  totalItems: number;
  totalPages: number;

  sortByKey: string;
  sortDesc: boolean;

  filterStatusValue: boolean;
  filterStatusOptions = ActiveFilterStatusOptions;

  constructor(private appService: AppService, private tableUtilityService: TableUtilityService, private <%= camelize(fileName) %>Service: <%= classify(fileName) %>Service, private router: Router, private activatedRoute: ActivatedRoute) {
    this.appService.pageTitle = '<%= classify(fileName) %> List';
    this.loading = true;

    this.sortByKey = 'id';
    this.sortDesc = false;
  }

  ngOnInit() {

    this.activatedRoute.queryParamMap.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      if (params.has('status')) {
        this.filterStatusValue = params.get('status') === '1';
      }

    this.loadData();
    });

  }

  loadData(){
    this.<%= camelize(fileName) %>Service.query([{ field: 'isActive', operator: '==', value: this.filterStatusValue }]).pipe(first()).subscribe(
      (items) => {
        this.allItems = items;

        this.update();
      }
    );
  }

   applyFilters() {
    this.router.navigate(['/', APP_ROUTE_NAMES.DEFAULT], { queryParams: { status: (this.filterStatusValue) ? '1' : '0' }, queryParamsHandling: 'merge' });
  }

  update() {
    const vm = this.tableUtilityService.applyAllUpdates(this.allItems, this.filterVal, this.searchKeys, this.sortByKey, this.sortDesc, this.perPage, this.currentPage);

    this.displayedItems = vm.results;
    this.totalItems = vm.totalItems;
    this.totalPages = vm.totalPages;

    this.loading = false;
  }

  onArchive(item: I<%= classify(fileName) %>) {
    const itemIndex = _.findIndex(this.allItems, item);

    if (itemIndex > -1) {
      item.isActive = false;
      this.salespersonService.update(item.id, item).then(
        () => {
          this.allItems[itemIndex] = item;
          this.update();
        }
      );
    }
  }

  onActivate(item: I<%= classify(fileName) %>) {
    const itemIndex = _.findIndex(this.allItems, item);

    if (itemIndex > -1) {
      item.isActive = true;
      this.salespersonService.update(item.id, item).then(
        () => {
          this.allItems[itemIndex] = item;
          this.update();
        }
      );
    }
  }


}
