import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { <%= classify(className) %>VM } from '../models/<%= dasherize(className) %>.model';



@Injectable({
  providedIn: 'root',
})
export class <%= classify(name) %>Service {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getById(id: number): Observable<HttpResponse<<%= classify(className) %>VM>> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<<%= classify(className) %>VM>(url, {observe: 'response'});
  }

  getAll(): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/all'
    return this.http.get<<%= classify(className) %>VM[]>(url, {observe: 'response'});
  }

  getAllActive(): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/all-active'
    return this.http.get<<%= classify(className) %>VM[]>(url, {observe: 'response'});
  }

  getAllByName(name: string): Observable<HttpResponse<Array<<%= classify(className) %>VM>>> {
    const url = this.baseUrl + '/query?name='+name;
    return this.http.get<<%= classify(className) %>VM[]>(url, {observe: 'response'});
  }

  add(data: <%= classify(className) %>VM): Observable<<%= classify(className) %>VM> {
    const url = this.baseUrl + '/add';
    return this.http.post<<%= classify(className) %>VM>(url, data, {observe: 'response'});
  }

  update(data: <%= classify(className) %>VM): Observable<<%= classify(className) %>VM> {
    const url = this.baseUrl + '/update';
    return this.http.post<<%= classify(className) %>VM>(url, data, {observe: 'response'});
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
