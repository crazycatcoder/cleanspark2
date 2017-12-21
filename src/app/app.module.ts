import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {Routes, RouterModule} from '@angular/router';
import { HttpModule } from "@angular/http";
import { WebService } from './shared/web.service';
import { HomeComponent } from './home/home.component';
import {ObservationResolver} from './shared/observation.resolver';
import { SearchArrayPipe } from './shared/search.array.pipe';
import {FormsModule} from '@angular/forms'
import { Daterangepicker } from 'ng2-daterangepicker';


var routes = [
  {
    path: '',
    component: HomeComponent
  },
  
    { 
      path: 'home', 
      component: HomeComponent
    },  
    { 
      path: 'graph/:id/:params', 
      component: GraphComponent, 
      resolve: {observations: ObservationResolver}
    }, 

  {
    path: 'graph',
    component: GraphComponent},
    {
      path: 'refresh', redirectTo: 'graph/:id/:params', pathMatch: 'full'
    }
  ]

    /* {
      path: 'home',
      component: HomeComponent}, */

   /*    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], { enableTracing: true })
    ],
    exports: [ RouterModule ] */

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    HomeComponent,
    SearchArrayPipe
  ],
  imports: [
    Daterangepicker, BrowserModule, HttpModule, RouterModule.forRoot(routes), Ng2GoogleChartsModule, FormsModule
  ],
  providers: [WebService, ObservationResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
