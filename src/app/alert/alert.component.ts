import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() variant: 'primary' | 'danger' = 'primary';
  @Input() text: string = '';

  onCloseClick = output<boolean>();

  closeAlert() {
    this.onCloseClick.emit(true);
  }
}
