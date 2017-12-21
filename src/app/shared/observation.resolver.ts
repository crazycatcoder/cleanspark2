import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {WebService} from './../shared/web.service';


/* @Injectable()
export class ObservationResolver implements Resolve<any> {
    constructor(private webService: WebService) {}
    resolve(route: ActivatedRouteSnapshot) {
        let id = route.params['id'];
        let params = route.params['params']
        console.log(id);
        console.log(params);
        return this.webService.getObservations2(id, params);;
      }
} */


@Injectable()
export class ObservationResolver implements Resolve<any> {
    constructor(private webService: WebService) {}
    resolve(route: ActivatedRouteSnapshot) {
        let id = route.params['id'];
        let params =  route.params['params'];
        console.log(id);
        return this.webService.getObservations2(id, params);;
      }
}

/* @Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService:EventService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.eventService.getEvent(route.params['id']);
  }
} */

/* @Injectable()
export class ObservationResolver implements Resolve<any> {
    constructor(private webService: WebService) {}
    resolve() {
        return this.webService.getObservations();
      }
} */