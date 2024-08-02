import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.scss'
})
export class NewModalComponent {
  constructor(private el: ElementRef){ }

  @ViewChild('header') headerRef?: ElementRef;
  
  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  close() {
    console.log('new-modal.component close()')
    this.el.nativeElement.remove();
    this.closeEvent.emit();
  }
  submit() {
    console.log('new-modal.component submit()')
    this.el.nativeElement.remove();
    this.submitEvent.emit();
  }
}
