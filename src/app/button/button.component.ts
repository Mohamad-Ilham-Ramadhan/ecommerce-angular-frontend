import { Component, Input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text = '';
  @Input() disabled?: boolean;
  @Input() color: 'danger' | 'primary' | 'outline' = 'primary';
  @Input() classes: string = '';
  onClick = output();

  get classArray() {
    return [this.color, this.classes]
  }
}
