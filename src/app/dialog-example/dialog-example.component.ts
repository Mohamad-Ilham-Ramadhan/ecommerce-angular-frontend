import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports: [],
  templateUrl: './dialog-example.component.html',
  styleUrl: './dialog-example.component.scss'
})
export class DialogExampleComponent {
  constructor(public dialogRef: DialogRef, @Inject(DIALOG_DATA) public data: DialogData){}
}
