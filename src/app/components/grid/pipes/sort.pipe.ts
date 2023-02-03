import { Pipe, PipeTransform } from '@angular/core';
import { DataSource } from '../grid.component';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: DataSource, sorting: { key: string, order: 'asc' | 'desc' }): DataSource {
    console.log(sorting)
    if (!sorting || !sorting.order || !sorting.key) return value;

    return value.sort((a, b) => {
      if (typeof a[sorting.key] === 'number') {
        return sorting.order === 'desc'
          ? (b[sorting.key] ?? 0) - (a[sorting.key] ?? 0)
          : (a[sorting.key] ?? 0) - (b[sorting.key] ?? 0)
      }
      if (typeof a[sorting.key] === 'string') {
        return sorting.order === 'desc'
          ? (b[sorting.key] ?? '').localeCompare((a[sorting.key] ?? ''))
          : (a[sorting.key] ?? '').localeCompare((b[sorting.key] ?? ''))
      }
      return 0
    });
  }

}
