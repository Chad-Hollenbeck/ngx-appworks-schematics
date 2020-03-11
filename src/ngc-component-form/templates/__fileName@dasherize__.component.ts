
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, Validators } from '@angular/forms';
import { T } from '../models/<%= dasherize(modelName) %>.model';
import { <%= classify(serviceName) %>Service } from '../services/<%= dasherize(serviceName) %>.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTE_NAMES } from '@app/app.routes.names';


@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>Component implements OnInit {

  loading: boolean;
  submitting: boolean;

  detailForm: FormGroup;

  @Input() selectedItem: T;
  @Input() isNew: boolean;

  constructor(private appService: AppService, private <%= camelize(serviceName) %>Service: <%= classify(serviceName) %>Service, private router: Router, private toastr: ToastrService) {

    this.detailForm = this.appService.buildFormGroup(new T());
    this.selectedItem = null;

    // Form Validators
    this.detailForm.get('id').setValidators(Validators.required);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (this.isNew) {
      this.selectedItem = new T();
      this.loading = false;
    }
  }


  onDetailSubmit() {
    this.submitting = true;

    const d = this.detailForm.getRawValue() as T;

    if (this.isNew) {
      this.add(d);
    } else {
      this.update(d);
    }
  }

  add(data: T) {
    this.<%= camelize(serviceName) %>Service.add(data).then(
      (item) => {
        this.router.navigate([APP_ROUTE_NAMES.T]);
        this.toastr.success("T saved");
      }
    )
  }

  update(data: T) {
    // Update
    this.<%= camelize(serviceName) %>Service.update(data).then(
      (resp) => {
        this.router.navigate([APP_ROUTE_NAMES.T]);
        this.toastr.success("T updated");
      }
    )
  }


}
