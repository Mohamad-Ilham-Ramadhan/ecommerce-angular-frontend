import { Component, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

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
}
