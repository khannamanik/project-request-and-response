import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  actionLabel = 'Confirm';
  title = 'Confirmation';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ids: string; str?: string },
    private dialogRef: MatDialogRef<Dialog>,
  ) {
    if (this.data?.str === 'edit') {
      this.actionLabel = 'Update';
      this.title = 'Update employee record?';
      return;
    }

    this.actionLabel = 'Delete';
    this.title = 'Delete employee record?';
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
