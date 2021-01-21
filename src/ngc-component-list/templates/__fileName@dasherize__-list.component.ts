import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';
import { <%= classify(fileName) %>Service } from '../services/<%= dasherize(fileName) %>.service';
import { first } from 'rxjs/operators';
import { TableUtilityService } from '@app/shared/+utilities/services/table-utility.service';

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

  constructor(private appService: AppService, private tableUtilityService: TableUtilityService, private <%= camelize(fileName) %>Service: <%= classify(fileName) %>Service) {
    this.appService.pageTitle = '<%= classify(fileName) %> List';
    this.loading = true;
  }

  ngOnInit() {
    this.<%= camelize(fileName) %>Service.list().pipe(first()).subscribe(
      (items) => {
        this.allItems = items;

        this.update();
      }
    );
  }

  update() {
    this.displayedItems = this.tableUtilityService.update(this.allItems, this.filterVal, this.searchKeys, 'name', false, this.perPage, this.currentPage);

    this.totalItems = this.allItems.length;
    this.totalPages = this.tableUtilityService.getTotalPages(this.totalItems, this.perPage);
    this.loading = false;

  }


}
