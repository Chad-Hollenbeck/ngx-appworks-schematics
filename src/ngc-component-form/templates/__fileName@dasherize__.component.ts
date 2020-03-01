
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '@app/app.service';
import { FormGroup, Validators } from '@angular/forms';
import { <%= classify(modelName) %>VM } from '../models/<%= dasherize(modelName) %>.model';
<% if (useFirebase) { %>import { <%= classify(serviceName) %>Service } from '../services/<%= dasherize(serviceName) %>.firebase.service';<% }else { %>import { <%= classify(serviceName) %>Service } from '../services/<%= dasherize(serviceName) %>.service'; <% } %>
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { APP_ROUTE_NAMES } from '@app/app.routes.names';


@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>Component implements OnInit, OnDestroy {

  loading: boolean;
  submitting: boolean;

  detailForm: FormGroup;

  @Input() selectedItem: <%= classify(modelName) %>VM;
  @Input() isNew: boolean;

  constructor(private appService: AppService, private <%= camelize(serviceName) %>Service: <%= classify(serviceName) %>Service, private router: Router, private toastr: ToastrService) {

    this.detailForm = this.appService.buildFormGroup(new <%= classify(modelName) %>VM());
    this.selectedItem = null;

    // Form Validators
    // this.detailForm.get('name').setValidators(Validators.required);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (this.isNew) {
      this.selectedItem = new <%= classify(modelName) %>VM();
      this.loading = false;
    }
  }


  onDetailSubmit() {
    this.submitting = true;

    const d = this.detailForm.getRawValue() as <%= classify(modelName) %>VM;

    if (this.isNew) {
      this.add(d);
    } else {
      this.update(d);
    }
  }

  add(data: <%= classify(modelName) %>VM) {
    this.<%= camelize(serviceName) %>Service.add(data).pipe(first()).subscribe(
      (item) => {
        this.router.navigate([APP_ROUTE_NAMES.<%= (modelName).toUpperCase() %>]);
        this.toastr.success("<%= classify(modelName) %> saved");
      }
    )
  }

  update(data: <%= classify(modelName) %>VM) {
    // Update
    this.<%= camelize(serviceName) %>Service.update(data).pipe(first()).subscribe(
      (resp) => {
        this.router.navigate([APP_ROUTE_NAMES.<%= (modelName).toUpperCase() %>]);
        this.toastr.success("<%= classify(modelName) %> updated");
      }
    )
  }

  ngOnDestroy() {

  }

}
