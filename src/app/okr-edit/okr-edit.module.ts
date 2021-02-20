import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OkrEditRoutingModule } from './okr-edit-routing.module';
import { OkrEditComponent } from './okr-edit/okr-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OkrEditComponent],
  imports: [
    CommonModule,
    OkrEditRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
  ],
})
export class OkrEditModule {}