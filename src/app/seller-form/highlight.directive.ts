import {Directive, ElementRef, HostListener, Input} from '@angular/core';
@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') xxx() {
    this.highlight('yellow');
  }
  @HostListener('mouseleave') zzz() {
    this.highlight('');
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}