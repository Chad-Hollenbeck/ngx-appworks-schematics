
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators } from '@angular/forms';
import { <%= classify(className) %> VM } from '../models/<%= dasherize(className) %>.model';
import { <%= classify(className) %> Service } from '../services/<%= dasherize(className) %>.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { APP_ROUTE_NAMES } from '@app/app.routes.names';
import { <%= classify(className) %> VM } from '../models/<%= dasherize(className) %>.model';


@Component({
  selector: 'app-<%= dasherize(name)-form %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: []
})
export class <%= classify(name) %> FormComponent implements OnInit, OnDestroy {

  loading: boolean;
  submitting: boolean;
  subs: Subscription;

  detailForm: FormGroup;
  selectedItem: CustomerVM;

  @Input() id: number;
  @Input() isNew: boolean;

  constructor(private appService: AppService, private <%= dasherize(className) %> Service: <%= classify(className) %> Service, private router: Router, private toastr: ToastrService) {
    this.subs = new Subscription();

    this.detailForm = this.appService.buildFormGroup(new <%= classify(className) %> VM());
    this.selectedItem = null;

    // Form Validators
    this.detailForm.get('name').setValidators(Validators.required);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (this.isNew) {
      this.loading = false;
    } else {
      this.loadData();
    }
  }

  loadData() {
    this.customerService.getById(this.id).pipe(first()).subscribe(
      (resp) => {
        this.selectedItem = resp.body;

        this.detailForm.patchValue(this.selectedItem);
        this.loading = false;
      }
    )
  }

  onDetailSubmit() {
    this.submitting = true;

    const _d = this.detailForm.getRawValue();

    if (this.isNew) {
      delete _d.id;
      this.add(_d);
    } else {
      this.update(_d);
    }
  }

  add(data: any) {
    this.<%= dasherize(className) %> Service.add(data).pipe(first()).subscribe(
      (resp) => {
        this.router.navigate([APP_ROUTE_NAMES.<%= (className).toUpperCase() %>, resp.body.id]);
        this.toastr.success("Customer saved");
      }
    )
  }

  update(data: any) {
    if (!data.id) data.id = this.id;
    // Update
    this.<%= dasherize(className) %> Service.update(data).pipe(first()).subscribe(
      (resp) => {
        this.router.navigate([APP_ROUTE_NAMES.<%= (className).toUpperCase() %>, resp.body.id]);
        this.toastr.success("Customer updated");
      }
    )
  }

  ngOnDestroy() {
    if (!this.subs.closed) {
      this.subs.unsubscribe();
    }
  }

}
