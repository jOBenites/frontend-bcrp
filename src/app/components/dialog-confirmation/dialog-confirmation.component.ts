import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-confirmation.component.html',
  styleUrl: './dialog-confirmation.component.scss'
})
export class DialogConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationComponent>);
  readonly dialogData: DialogData = inject(MAT_DIALOG_DATA);
}

export interface DialogData {
  title: string;
  message: string;
}