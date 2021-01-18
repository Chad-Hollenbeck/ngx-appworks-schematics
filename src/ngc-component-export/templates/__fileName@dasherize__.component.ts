import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-<%= dasherize(fileName) %>',
  templateUrl: './<%= dasherize(fileName) %>.component.html',
  styleUrls: ['./<%= dasherize(fileName) %>.component.scss']
})
export class <%= classify(fileName) %>Component implements OnInit {

  loading: boolean;

  constructor(private appService: AppService, private toastr: ToastrService) {
    this.appService.pageTitle = '<%= classify(fileName) %>';

  }

  ngOnInit() {
    this.loading = true;
  }


}
