import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { RouterModule } from '@angular/router';
import { FileService } from './services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/HttpService.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    AboutmeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'aboutme', component: AboutmeComponent },
    ]),
    HttpClientModule,
    BrowserAnimationsModule, MatCardModule,ReactiveFormsModule,MatInputModule
  ],
  providers: [FileService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
