import { Component, Input, output, OnChanges, SimpleChanges } from '@angular/core';

export type AlertVariant = 'primary' | 'danger';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnChanges {
  @Input() variant: AlertVariant = 'primary';
  @Input() text: string = '';
  @Input() onSale: boolean = false;
  classes: string[] = ['alert']; 

  setCurrentClasses() {

  }

  constructor() {
    this.classes = ['alert', this.variant];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const variant = changes['variant'];
    if (variant.currentValue !== variant.previousValue) {
      this.classes = ['alert', variant.currentValue]
    }
  }

  onCloseClick = output<boolean>();

  closeAlert() {
    this.onCloseClick.emit(true);
  }
}
