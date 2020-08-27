
import { Injectable } from '@angular/core';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/core/+crud/services/crud.base.service';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service extends BaseCrudService<I<%= classify(fileName) %>> {

  constructor(client: HttpClient) {
    super('<%= camelize(fileName) %>', client);
  }
}
