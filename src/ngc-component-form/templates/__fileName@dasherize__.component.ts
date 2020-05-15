
import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, Validators } from '@angular/forms';
import { <%= classify(moduleName) %>Service } from '../services/<%= dasherize(moduleName) %>.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTE_NAMES } from '@app/app.routes.names';


@Component({
  selector: 'app-<%= dasherize(fileName) %>-form',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>FormComponent implements OnInit {

  loading: boolean;
  submitting: boolean;

  detailForm: FormGroup;

  @Input() selectedItem: T;
  @Input() isNew: boolean;

  constructor(private appService: AppService, private <%= camelize(moduleName) %>Service: <%= classify(moduleName) %>Service, private router: Router, private toastr: ToastrService) {

    this.detailForm = this.appService.buildFormGroup({});
    this.selectedItem = null;

    // Form Validators
    this.detailForm.get('id').setValidators(Validators.required);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (this.isNew) {
      this.selectedItem = {};
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
    this.<%= camelize(moduleName) %>Service.add(data).then(
      (item) => {
        this.router.navigate([APP_ROUTE_NAMES.T]);
        this.toastr.success("T saved");
      }
    )
  }

  update(data: T) {
    // Update
    this.<%= camelize(moduleName) %>Service.update(data).then(
      (resp) => {
        this.router.navigate([APP_ROUTE_NAMES.T]);
        this.toastr.success("T updated");
      }
    )
  }


}
