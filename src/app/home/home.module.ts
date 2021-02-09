import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { OkrComponent } from './okr/okr.component';
import { MatCardModule } from '@angular/material/card';
import { HomeDetailComponent } from '../home-detail/home-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { OkrDialogComponent } from '../home-detail/okr-dialog/okr-dialog.component';
import { HomeDetailTitleComponent } from '../home-detail-title/home-detail-title.component';
import { OkrDetailComponent } from '../home-detail/okr-dialog/okr-detail/okr-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { OkrEditComponent } from '../okr-edit/okr-edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SecondOkrComponent } from '../second-okr/second-okr.component';

@NgModule({
  declarations: [
    HomeComponent,
    OkrComponent,
    HomeDetailComponent,
    OkrDialogComponent,
    HomeDetailTitleComponent,
    OkrDetailComponent,
    OkrEditComponent,
    SecondOkrComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatDatepickerModule,
  ],
})
export class HomeModule {}
