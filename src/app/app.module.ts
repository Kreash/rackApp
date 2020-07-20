import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DisplayRackComponent } from './display-rack/display-rack.component';
import { DisplayConditionComponent } from './display-condition/display-condition.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayRackComponent,
    DisplayConditionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
