
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { <%= classify(modelName) %>VM } from '../models/<%= dasherize(modelName) %>.model';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service {
  <%= camelize(modelName) %>Collection: AngularFirestoreCollection;

  constructor(private afa: AngularFireAuth, private firestore: AngularFirestore) {
    this.<%= camelize(modelName) %>Collection = this.firestore.collection<<%= classify(modelName) %>VM>('<%= camelize(modelName) %>');
  }



  add(data): Observable<<%= classify(modelName) %>VM> {
    if (!data.id) { data.id = this.firestore.createId(); }
    return this.get(data);
  }


  update(data, overwrite : boolean = false) {
    if (overwrite) {
      return this.<%= camelize(modelName) %>Collection.doc(data.id).set(data);
    } else {
      return this.<%= camelize(modelName) %>Collection.doc(data.id).update(data);
    }
  }

  enable(id: string): Promise < void> {
    return this.<%= camelize(modelName) %>Collection.doc(id).update({ isActive: true });
  }

  disable(id: string): Promise < void> {
    return this.<%= camelize(modelName) %>Collection.doc(id).update({ isActive: false });
  }


  delete (id: string): Promise < void> {
    return this.<%= camelize(modelName) %>Collection.doc(id).delete();
  }


  getAll(): Observable<Array<<%= classify(modelName) %>VM>> {
    return this.<%= camelize(modelName) %>Collection.valueChanges() as Observable<Array<<%= classify(modelName) %>VM>>;
  }


  getAllActive():Promise<firebase.firestore.QuerySnapshot> {
    return this.<%= camelize(modelName) %>Collection.ref.where('isActive', '==', true).get();
  }


  getAllByQuery(field: string, operator: firebase.firestore.WhereFilterOp, value: any):Promise<firebase.firestore.QuerySnapshot> {
    return this.<%= camelize(modelName) %>Collection.ref.where(field, operator, value).get();
  }


  get(id: string): Observable<<%= classify(modelName) %>VM> {
    return this.<%= camelize(modelName) %>Collection.doc<<%= classify(modelName) %>VM>(id).valueChanges();
  }
}
