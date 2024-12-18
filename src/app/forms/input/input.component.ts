import { Component, Input, output, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {  ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',

})
export class InputComponent {
  @Input() id = '';
  @Input() control?: FormControl | undefined;
  @Input() className!: string;
  @Input() type: string = 'text';
  @Input() accept?: string;
  
  onChange = output();
  change(e: any) {
    this.onChange.emit(e)
  }

  inputFocus() {
    this.inputEl?.nativeElement.focus();
  }

  @ViewChild('input') inputEl?: ElementRef<HTMLInputElement>;
}
