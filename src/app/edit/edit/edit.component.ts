import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { OkrService } from 'src/app/services/okr.service';
import { AuthService } from 'src/app/services/auth.service';
import { Okr } from 'src/app/interfaces/okr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateFirstOkrDialogComponent } from 'src/app/create-first-okr-dialog/create-first-okr-dialog.component';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [],
})
export class EditComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(40)]],
    primaries: this.fb.array([]),
  });

  get primaries(): FormArray {
    return this.form.get('primaries') as FormArray;
  }
  get titleControl() {
    return this.form.get('title') as FormControl;
  }
  get primariesControl() {
    return this.form.get('primaries') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private okrService: OkrService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addOptionForm();
  }

  removeOption(i: number) {
    this.primaries.removeAt(i);
  }

  addOptionForm() {
    this.primaries.push(
      new FormControl('', [Validators.required, Validators.maxLength(20)])
    );
  }

  submit() {
    const formData = this.form.value;
    const okrValue: Omit<Okr, 'id' | 'isComplete'> = {
      title: formData.title,
      primaries: formData.primaries,
      CreatorId: this.authService.uid,
    };
    const primaryArray = formData.primaries;
    this.okrService.createOkr(okrValue, primaryArray).then(() => {
      this.router.navigateByUrl('manage/home');
      this.dialog.open(CreateFirstOkrDialogComponent, {
        autoFocus: false,
        restoreFocus: false,
      });
    });
  }
}
