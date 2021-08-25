
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { <%= classify(fileName) %>Service } from '../services/<%= dasherize(fileName) %>.service';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';
import { FormUtilityService } from '@app/shared/+utilities/services/form-utility.service';

@Component({
  selector: 'app-<%= dasherize(fileName) %>-form',
  templateUrl: './<%= dasherize(fileName) %>-form.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>FormComponent implements OnInit {

  loading: boolean;
  submitting: boolean;

  detailForm: FormGroup;

  @Input() selectedItem: I<%= classify(fileName) %>;
  @Input() isNew: boolean;

  @Output() onAdd: EventEmitter <string> = new EventEmitter();
  @Output() onUpdate: EventEmitter <string> = new EventEmitter();


  constructor(private formUtilityService: FormUtilityService, private <%= camelize(fileName) %>Service: <%= classify(fileName) %>Service, private toastr: ToastrService) {

    this.selectedItem = I<%= classify(fileName).toUpperCase() %>_DEFAULTS;
    this.detailForm = this.formUtilityService.buildFormGroup(this.selectedItem);

    // Form Validators
    this.detailForm.get('id').setValidators(Validators.required);
  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    if (!this.isNew) {
      this.detailForm.patchValue(this.selectedItem);
    }

    this.loading = false;

  }


  onDetailSubmit() {
    this.submitting = true;

    const d = this.detailForm.getRawValue() as I<%= classify(fileName) %>;

    if (this.isNew) {
      this.add(d);
    } else {
      this.update(d);
    }
  }

  add(data: I<%= classify(fileName) %>) {
    this.<%= camelize(fileName) %>Service.add(data).then(
      (item) => {
        this.toastr.success('<%= classify(fileName) %> saved');
        this.onAdd.emit(item.id);
      }
    );
  }

  update(data: I<%= classify(fileName) %>) {
    // Update
    this.<%= camelize(fileName) %>Service.update(data.id, data).then(
      () => {
        this.toastr.success('<%= classify(fileName) %> updated');
        this.onUpdate.emit(data.id);
      }
    );
  }

  getControlError(name: string): string {
    return this.formUtilityService.getControlError(this.detailForm, name);
  }

}
