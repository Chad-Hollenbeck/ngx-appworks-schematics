import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: []
})
export class <%= classify(name) %>Component implements OnInit, OnDestroy {

  loading: boolean;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = '<%= classify(name) %>';

  }

  ngOnInit() {
    this.loading = true;

    // Load Data
    this.loadData()
  }

  private loadData(){

  }

  ngOnDestroy(){

  }

}
