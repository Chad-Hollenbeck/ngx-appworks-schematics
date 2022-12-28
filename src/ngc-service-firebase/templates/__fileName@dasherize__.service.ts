
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BaseFirebaseService } from '@app/core/firestore/services/base-firebase.service';
import { FirestoreDataConverter } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %> Service extends BaseFirebaseService<any> {

  constructor(firestore: Firestore) {
    const converter: FirestoreDataConverter<any> = {
      toFirestore: (data) => {
        return {
          archived: data.archived,
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
          id: snapshot.id,
          archived: data.archived,
        } as any;
      }
    };
    super(firestore, 'collection-path', converter);
  }
}
