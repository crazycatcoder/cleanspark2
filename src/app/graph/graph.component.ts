import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {WebService} from './../shared/web.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {IObservation} from '../shared/Observation';
import {ViewChild} from '@angular/core';
import {HostListener} from '@angular/core';
import {GoogleChartComponent} from 'ng2-google-charts';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import {  AfterViewInit  } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

declare var moment:any;

declare var jquery:any;
declare var $ :any;

declare var google:any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})


//
export class GraphComponent implements OnInit {
  public observations: IObservation[];
  range: string = ' ';


  // @ViewChild('visualization_div') chart: GoogleChartComponent;
  
  constructor(private daterangepickerOptions: DaterangepickerConfig, private router: Router, private webService: WebService,
    private route: ActivatedRoute) {   
    
      this.daterangepickerOptions.settings = {       
        alwaysShowCalendars: true,
        timePicker: true,
        startDate: "10/14/2017",
        endDate: "12/14/2017"
    };
     }

      
    ngOnInit(arg?) {    
      
      if(arg)
      this.range = arg;
      else
      this.range = ' ';
     // console.log('rangenginitafterearg',this.range);
     
      this.observations = this.route.snapshot.data['observations'];
     // console.log(this.observations);
      var temp = this.observations;
      var dateRange = this.range;
     // console.log('r',temp);


      google.charts.load('current');
      google.charts.setOnLoadCallback(drawVisualization);    
       
      function drawVisualization() {
        var observe = go();
        var range = go2();
        console.log( "before process data",observe);

        //console.log('drawvisualization',observe);
        var z = observe[0][1];
        console.log(z)
        console.log(observe)
        console.log(range)
        
        var dataTable = processData(observe, range);
      //  console.log("after processdata");
        
       // console.log(dataTable);
      
         google.visualization.drawChart({
           "containerId": "visualization_div",
           "dataTable": dataTable,
           "refreshInterval": 5,
           "chartType": "ScatterChart",
           "options": {
            "width": 1200,
            "height" : 500
          }
           
           
         });
       } // end draw visualization
  
       function go(): any{

        for(var i=1;i<temp.length;i++){
          if( temp[i][1] == true)
          {temp[i][1] = 1;}
          else if(temp[i][1] == false)
          {temp[i][1] = 0;}
          else if(temp[i][1] == 'On')
          {temp[i][1] = 1;}
          else if(temp[i][1] == 'Off')
          {temp[i][1] = 0;}

          }
          console.log("temp in go", temp)
        // console.log('go',temp);        
        return temp;
      }
      function go2(): any{
       // console.log('go date ',dateRange);        
       return dateRange;
     }

      
       function processData(v, dates){
       
       // var whatType = detectType(v[1][1]);
      //  console.log(whatType);


        var data = new google.visualization.DataTable();

        data.addColumn('date', 'TimeStamp');
        data.addColumn('number', 'Observation Value');
       // console.log('v2',[0][0]);
       /*  data.addRows([
          ['Work', 11],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', {v:7, f:'7.000'}]
        ]); */
      
         // console.log(this.observations);
         // console.log(whatType);
         // console.log(b);
         

         if(dates != ' '){
          console.log('if dates not empty');

          var index = dates.indexOf(" ");  // Gets the first index where a space occours
          var start = dates.substr(0, index); // Gets the first part
          var end = dates.substr(index + 1); 
         

         
          for(var i=1;i<v.length;i++){
          
          var z = v[i][0]
              var x = new Date(v[i][0]);        
             // var y = v[i][1];
            //  console.log('y',y);
              if ( Date.parse(start) < Date.parse(v[i][0]) && Date.parse(end) > Date.parse(v[i][0]))
                {
               // console.log("adding row");
                  data.addRow([ x,z]);               
                 }
            } //end if
          }
          else {
            console.log('if dates empty');
            for(var i=1;i<v.length;i++){
    
              var x = new Date(v[i][0]); 
            var y = v[i][1];}

    
           // var y = v[i][1];
            
            data.addRow([ x,y]);
          
          }        
      
        console.log("end of process data")
      
      return data;
       } // end processData

     
   
    }  // end ngonit
 
  private selectedDate(value: any) {    
    
    var x  = new Date(value.start).toISOString();
    var y  = new Date(value.end).toISOString();        
    var z = x + ' ' + y;     
    this.ngOnInit(z) 
  } 
}


  
  
