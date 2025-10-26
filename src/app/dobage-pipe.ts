import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dobage'
})
export class DobagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return new Date().getFullYear()-new Date(value).getFullYear()
  }

}
