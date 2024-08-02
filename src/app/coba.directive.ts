import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[app-coba]',
  standalone: true
})
export class CobaDirective {
  @Input('wkwk') value?: string;
  constructor(private el: ElementRef) { 
    console.log('coba @Directive constructor()');
   }
  isRed: boolean = false;
  @HostListener('click') onClick() {
    console.log('coba @Directive @HostListener("click"). @Input(): ', this.value);
    if (this.isRed) {
      this.isRed = false;
      this.el.nativeElement.style.color = 'black';
    } else {
      this.isRed = true;
      this.el.nativeElement.style.color = 'red';
    }
  }

}
