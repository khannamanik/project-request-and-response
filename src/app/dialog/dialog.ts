import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions} from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dialog',
 imports: [MatDialogActions, MatDialogClose, MatButtonModule, NgIf],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog {
   constructor(@Inject(MAT_DIALOG_DATA) public data:{ids:number,str:String}){}
}
