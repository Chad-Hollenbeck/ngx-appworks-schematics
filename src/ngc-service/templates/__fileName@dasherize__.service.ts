import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { <%= classify(modelName) %>VM } from '../models/<%= dasherize(modelName) %>.model';



@Injectable({
  providedIn: 'root',
})
export class <%= classify(fileName) %>Service {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getById(id: number): Observable<HttpResponse<<%= classify(modelName) %>VM>> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<<%= classify(modelName) %>VM>(url, {observe: 'response'});
  }

  getAll(): Observable<HttpResponse<Array<<%= classify(modelName) %>VM>>> {
    const url = this.baseUrl + '/all'
    return this.http.get<<%= classify(modelName) %>VM[]>(url, {observe: 'response'});
  }

  getAllActive(): Observable<HttpResponse<Array<<%= classify(modelName) %>VM>>> {
    const url = this.baseUrl + '/all-active'
    return this.http.get<<%= classify(modelName) %>VM[]>(url, {observe: 'response'});
  }

  getAllByProperty(prop: string, val: string): Observable<HttpResponse<Array<<%= classify(modelName) %>VM>>> {
    const url = this.baseUrl + '/query?prop='+prop+'&val='+val;
    return this.http.get<<%= classify(modelName) %>VM[]>(url, {observe: 'response'});
  }

  add(data: <%= classify(modelName) %>VM): Observable<<%= classify(modelName) %>VM> {
    const url = this.baseUrl + '/add';
    return this.http.post<<%= classify(modelName) %>VM>(url, data, {observe: 'response'});
  }

  update(data: <%= classify(modelName) %>VM): Observable<<%= classify(modelName) %>VM> {
    const url = this.baseUrl + '/update';
    return this.http.post<<%= classify(modelName) %>VM>(url, data, {observe: 'response'});
  }

  disable(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/disable/' + id;
    return this.http.get<boolean>(url, {observe: 'response'});
  }

  enable(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/enable/' + id;
    return this.http.get<boolean>(url, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/delete/' + id;
    return this.http.get<boolean>(url, {observe: 'response'});
  }


}
