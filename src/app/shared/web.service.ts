import { Headers, Http, Response, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import "rxjs/add/operator/take";
import {IObservation} from '../shared/Observation';
import {ITag} from '../shared/Tag'

@Injectable()
export class WebService {
  
    BASE_URL3 = 'http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/Tag1?startTS=2017-11-14T02:49:47.5377632&endTS=2017-11-15T05:49:47.5377632';
    BASE_URL_OB = 'http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/'  // /Tag1 ?startTS=2017-11-14T02:49:47.5377632&endTS=2017-11-15T02:49:47.5377632';
    PARAMS_SEGMENT = '?startTS=2017-11-14T02:49:47.5377632&endTS=2017-11-14T05:59:47.5377632'
    BASE_URL_TAG = 'http://cs-mock-timeseries-api.azurewebsites.net/api/tag/'
   // http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/Tag1?startTS=2017-11-14T02:49:47.5377632&endTS=2017-11-15T02:49:47.5377632
   
    constructor(  private http: Http) {
      
    }

  public observations: IObservation[] =[];
  public tags: ITag[]  =[];

  

  getTags():Observable<ITag[]>{
    return this.http.get(this.BASE_URL_TAG)
    .map((response: Response) => this.tags = response.json()).
    catch(this.handleError); 
  }
  getObservations2(id: string, arg?: any):Observable<IObservation[]> {
    var data: any[];
     var x =  typeof(arg);
   
    const url = `${this.BASE_URL_OB}${id}${arg}`;
    return this.http.get(url).map((response: Response) => {
        data = response.json();
        data  = data.map(observation=>[ observation.observationTS, observation.value]);
        data.unshift(['TimeStamp', 'Observation']);       
        return data;
    }).catch(this.handleError);    
  }


  /* getObservations():Observable<IObservation[]> {
    return this.http.get(this.BASE_URL3).map((response: Response) => {
        return <IObservation[]>response.json();
    }).catch(this.handleError);    
  } */

  
  
private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}