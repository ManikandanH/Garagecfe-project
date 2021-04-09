import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: String): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toString().toLowerCase();
return items.filter( it => {
    const result = it.name.toLowerCase().includes(searchText);
      return it.name.toLowerCase().includes(searchText);
    });
   }
}