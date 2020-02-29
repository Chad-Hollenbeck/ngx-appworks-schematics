import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: []
})
export class <%= classify(fileName) %>Component implements OnInit, OnDestroy {

  loading: boolean;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = '<%= classify(fileName) %>';

  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    this.loadData()
  }

  private loadData(){
    this.loading = false;
  }

  ngOnDestroy(){

  }

}
