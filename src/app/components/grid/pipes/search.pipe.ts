import { Pipe, PipeTransform } from '@angular/core';
import { DataSource } from '../grid.component';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: DataSource, keys: string[], searchTerm: string): DataSource {
    return value.filter((el) => {
      return keys.some((key) => {
        if (typeof el[key] === 'number') return el[key] == searchTerm;
        if (typeof el[key] === 'string') return el[key].toLowerCase().includes(searchTerm.toLowerCase());
        return false;
      })
    });
  }

}
