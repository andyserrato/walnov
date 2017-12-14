import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(value: Date, args?: any): String {
    return this.format(value.getHours())+":"+this.format(value.getMinutes());
  }

  format(algo: number): String {
    return ('0'+algo).slice(-2);
  }
}
