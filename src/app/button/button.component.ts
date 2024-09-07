import { Component, OnInit, Input, output, Renderer2, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() disabled?: boolean;
  @Input() color: 'danger' | 'primary' | 'outline' = 'primary';
  @Input() classes: string = '';
  @Input() hostClasses: string = '';

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, this.hostClasses)
  }

  onClick = output();

  get classArray() {
    return [this.color, this.classes]
  }
}
