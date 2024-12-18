import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-coba-dialog',
  standalone: true,
  imports: [],
  templateUrl: './coba-dialog.component.html',
  styleUrl: './coba-dialog.component.scss'
})
export class CobaDialogComponent {
  dialogRef = inject(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  
  onNoClick() {
    this.dialogRef.close();
  }
}
