import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { <%= classify(className) %>VM } from '../models/<%= dasherize(className) %>.model';



@Injectable()
export class <%= classify(name) %>Service {

  baseUrl: string;
  options: any = {observe: 'response'};

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getById(id: number): Observable<HttpResponse<<%= classify(className) %>VM>> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<<%= classify(className) %>VM>(url, this.options);
  }

  getAll(): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/all'
    return this.http.get<<%= classify(className) %>VM[]>(url, this.options);
  }

  getAllActive(): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/all-active'
    return this.http.get<<%= classify(className) %>VM[]>(url, this.options);
  }

  getAllByName(name: string): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/query?name='+name;
    return this.http.get<<%= classify(className) %>VM[]>(url, this.options);
  }

  add(data: <%= classify(className) %>VM): Observable<<%= classify(className) %>VM> {
    const url = this.baseUrl + '/add';
    return this.http.post<<%= classify(className) %>VM>(url, data, this.options);
  }

  update(data: <%= classify(className) %>VM): Observable<<%= classify(className) %>VM> {
    const url = this.baseUrl + '/update';
    return this.http.post<<%= classify(className) %>VM>(url, data, this.options);
  }

  disable(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/disable/' + id;
    return this.http.get<boolean>(url, this.options);
  }

  enable(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/enable/' + id;
    return this.http.get<boolean>(url, this.options);
  }

  delete(id: number): Observable<HttpResponse<boolean>> {
    const url = this.baseUrl + '/delete/' + id;
    return this.http.get<boolean>(url, this.options);
  }


}
