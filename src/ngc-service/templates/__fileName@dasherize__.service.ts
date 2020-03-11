import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { T } from '../models/T.model';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getById(id: number): Observable<T> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<T>(url);
  }

  getAll(): Observable<Array<T>> {
    const url = this.baseUrl + '/all'
    return this.http.get<T[]>(url);
  }

  getAllActive(): Observable<Array<T>> {
    const url = this.baseUrl + '/all-active'
    return this.http.get<T[]>(url);
  }

  getAllByProperty(prop: string, val: string): Observable<Array<T>> {
    const url = this.baseUrl + '/query?prop='+prop+'&val='+val;
    return this.http.get<T[]>(url);
  }

  add(data: T): Observable<T> {
    const url = this.baseUrl + '/add';
    return this.http.post<T>(url, data);
  }

  update(data: T): Observable<T> {
    const url = this.baseUrl + '/update';
    return this.http.post<T>(url, data);
  }

  disable(id: number): Observable<boolean> {
    const url = this.baseUrl + '/disable/' + id;
    return this.http.get<boolean>(url);
  }

  enable(id: number): Observable<boolean> {
    const url = this.baseUrl + '/enable/' + id;
    return this.http.get<boolean>(url);
  }

  delete(id: number): Observable<boolean> {
    const url = this.baseUrl + '/delete/' + id;
    return this.http.get<boolean>(url);
  }


}
