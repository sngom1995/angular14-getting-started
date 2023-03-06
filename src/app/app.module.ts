import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ProductListComponent} from "./products/product-list.component";
import {FormsModule} from "@angular/forms";
import {ConvertToSpacesPipe} from "./shared/convert-to-spaces.pipe";
import {StarComponent} from "./shared/star.component";
import {HttpClientModule} from "@angular/common/http";
import {WelcomeComponent} from "./home/welcome.component";
import { ComponentDetailComponent } from './products/component-detail.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ComponentDetailComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    WelcomeComponent,
    ConvertToSpacesPipe,
    ComponentDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
