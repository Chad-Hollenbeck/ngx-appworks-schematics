
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { <%= classify(className) %>VM } from '../models/<%= dasherize(className) %>.model';

@Injectable()
export class <%= classify(name) %>Service {
  <%= camelize(className) %>Collection: AngularFirestoreCollection;

  constructor(private afa: AngularFireAuth, private firestore: AngularFirestore) {
    this.<%= camelize(className) %>Collection = this.firestore.collection<<%= classify(className) %>VM>('<%= camelize(className) %>');
  }


  /**
   * Add data to new document with generated ID
   * @author chollenbeck 2019-12-11
   */
  add(data): Observable<<%= classify(className) %>VM> {
    if (!data.id) { data.id = this.firestore.createId(); }
    return this.get(data);
  }

  /**
   * Update with flag for overwriting all data
   * @author chollenbeck 2019-12-11
   */
  update(data, overwrite ?: boolean) {
    if (overwrite) {
      return this.<%= camelize(className) %>Collection.doc(data.id).set(data);
    } else {
      return this.<%= camelize(className) %>Collection.doc(data.id).update(data);
    }
  }

  // Soft re-enable document
  enable(id: string): Promise < void> {
    return this.<%= camelize(className) %>Collection.doc(id).update({ isActive: true });
  }

  // Soft delete document
  disable(id: string): Promise < void> {
    return this.<%= camelize(className) %>Collection.doc(id).update({ isActive: false });
  }

  /**
   * Hard delete a document
   * @author chollenbeck 2019-12-11
   */
  delete (id: string): Promise < void> {
    return this.<%= camelize(className) %>Collection.doc(id).delete();
  }

  /**
   * Get the user collection
   */
  getAll(): Observable<Array<<%= classify(className) %>VM>> {
    return this.<%= camelize(className) %>Collection.valueChanges() as Observable<Array<<%= classify(className) %>VM>>;
  }

  /**
   * Get all documents with isActive = true
   * @author chollenbeck 2019-12-11
   */
  getAllActive():Promise<firebase.firestore.QuerySnapshot> {
    return this.<%= camelize(className) %>Collection.ref.where('isActive', '==', true).get();
  }

  /**
   * Get all by custom query field & operator
   * @author chollenbeck 2019-12-11
   */
  getAllByQuery(field: string, operator: firebase.firestore.WhereFilterOp, value: any):Promise<firebase.firestore.QuerySnapshot> {
    return this.<%= camelize(className) %>Collection.ref.where(field, operator, value).get();
  }

  /**
   * Get single document by ID
   * @author chollenbeck 2019-12-11
   */
  get(id: string): Observable<<%= classify(className) %>VM> {
    return this.<%= camelize(className) %>Collection.doc<<%= classify(className) %>VM>(id).valueChanges();
  }




}
