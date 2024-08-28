import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idr',
  standalone: true
})
export class IdrPipe implements PipeTransform {

  transform(value: bigint | number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value ? value : 0);
  }

}
