import { PipeTransform, Pipe } from '@angular/core';
import {ITag} from './Tag'

@Pipe({name: 'SearchArray'})
export class SearchArrayPipe implements PipeTransform {
  transform(tags: ITag[], input: string) {
      let searchText = input;
      if(!input) return tags;
      if (tags) {
       return tags.filter(search => {
          if (search) {
              return  !search.features.every(feature => {
                 return (!feature.includes(searchText))
                          });
                      
              }
          });
      }
  }
}