import { Component, Inject, output } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { ButtonComponent } from '../button/button.component';

export interface ModalData {
  text: string;
}

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: ModalData) {
    console.log('dialogRef', dialogRef);
  }

  onDelete() {
    this.dialogRef.close('delete')
  }
  
  onCancel() {
    this.dialogRef.close()
  }
}
