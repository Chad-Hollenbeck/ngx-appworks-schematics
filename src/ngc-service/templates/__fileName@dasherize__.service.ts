
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { I<%= classify(fileName) %> } from '../models/<%= dasherize(fileName) %>.model';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service extends BaseCrudService<I<%= classify(fileName) %>> {

  constructor(afs: AngularFirestore) {
    super('<%= camelize(fileName) %>', afs);
  }
}
