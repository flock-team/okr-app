import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from 'src/app/delete-account-dialog/delete-account-dialog.component';
import { ImageCropDialogComponent } from 'src/app/image-crop-dialog/image-crop-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void {}

  openDeleteAccountDialog() {
    this.dialog.open(DeleteAccountDialogComponent, {
      width: '450px',
      autoFocus: false,
      restoreFocus: false,
    });
  }

  openImageCropDialog(event: any, imageSelecter: any): void {
    this.dialog.open(ImageCropDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: { event, imageSelecter },
    });
  }
}