import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule(
  {
    declarations: [
    ],
    imports: [
      FormsModule,
      CommonModule,
      NgbModule,
      LayoutModule,
      <%= classify(featureName) %>RoutingModule,
      ReactiveFormsModule
    ]
  }
)
export class <%= classify(featureName) %>Module { }
