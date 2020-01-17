import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { <%= classify(className) %>VM } from '../models/<%= dasherize(className) %>.model';


@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: []
})
export class <%= classify(name) %> Component implements OnInit, OnDestroy {

  loading: boolean;
  subs: Subscription;
  displayedItems: Array<<%= classify(className) %>VM>;

  sortBy = 'name';
  sortDesc = false;
  filterVal = '';
  showInactive: boolean = false;
  searchKeys = ['id', 'name'];

  @Input() items: Array<<%= classify(className) %>VM>;

  constructor(private appService: AppService) {
    // this.appService.pageTitle = 'Sample Page Title';

    this.subs = new Subscription();
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (this.items) {
      this.update();
      this.loading = false;
    } else {
      setTimeout(this.ngOnInit, 500);
    }
  }


  update() {
    const data = this.filter(this.items);

    this.sort(data);
    this.displayedItems = (data);
  }

  filter(data: any) {
    const filter = this.filterVal.toLowerCase();
    return !filter && this.showInactive ?
      data.slice(0) :
      data.filter((d: any) => {
        return (this.showInactive || d.isActive) && (Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter);
      });

  }

  sort(data: any) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  setSort(key: string) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }
    this.update();
  }

  toggleInactive() {
    this.showInactive = !this.showInactive;
    this.update();
  }

  ngOnDestroy() {
    if (!this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

}
