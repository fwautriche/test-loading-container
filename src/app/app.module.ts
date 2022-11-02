import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoadingContainerComponent } from './loading-container/loading-container.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, LoadingContainerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
