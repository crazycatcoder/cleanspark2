import { Component, OnInit } from '@angular/core';
import {WebService} from './../shared/web.service';
import {IObservation} from '../shared/Observation';
import { ActivatedRoute, Router } from '@angular/router';
import {ITag} from '../shared/Tag';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { SearchArrayPipe } from '../shared/search.array.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public observations2: IObservation[];
  public tags: ITag[];
  selectedTag: ITag;
  tagFilter: string;

  constructor(private router: Router, private webService: WebService) {
  //this.tagFilter = '';
   }

  ngOnInit(): void {
   
    this.webService.getTags().subscribe(success => {
      if (success) {
        this.tags = this.webService.tags;
        console.log(this.tags);
      }

    });  
  
  }
  onSelect(tag: ITag): void {
    var params = '?startTS=2017-10-14T02:49:47.5377632&endTS=2017-12-14T05:59:47.5377632';
    
    this.selectedTag = tag;
    this.router.navigate(['/graph', this.selectedTag.tagId, params]);  
    
    // this.router.navigate(['/graph', this.selectedTag.tagId],{ queryParams: { param: params } });  
  }

  

}
