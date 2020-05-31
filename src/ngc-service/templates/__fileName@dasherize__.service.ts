
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseCrudService } from '@app/shared/+firebase-crud/services/crud.base.service';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service extends BaseCrudService<I<%= classify(fileName) %>> {

  constructor(afs: AngularFirestore) {
    const path = '<%= camelize(fileName) %>';
    super(path, afs);
  }
}
