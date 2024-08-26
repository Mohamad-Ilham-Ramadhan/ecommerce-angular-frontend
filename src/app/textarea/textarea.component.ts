import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() control?: FormControl | undefined;
  @Input() name?: string;
  @Input() id?: string;
  @Input() cols?: string;
  @Input() rows?: string;
  @Input() classes?: string;
}
