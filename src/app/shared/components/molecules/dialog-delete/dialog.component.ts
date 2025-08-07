import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* angular material */
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  dialogData: DialogData;
  title:string = 'Confirmar acción';
  message:string ='¿Está seguro de que desea realizar esta acción?';

  constructor(
    public matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = {
      title: data.title,
      message: data.message
    };
    }

  onConfirm(): void {
    this.matDialogRef.close(true);
  }

  onDismiss(): void {
    this.matDialogRef.close(false);
  }

}
