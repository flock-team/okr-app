import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { OkrService } from 'src/app/services/okr.service';
import { AuthService } from 'src/app/services/auth.service';
import { Okr } from 'src/app/interfaces/okr';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parent-okr-form',
  templateUrl: './parent-okr-form.component.html',
  styleUrls: ['./parent-okr-form.component.scss'],
  providers: [],
})
export class ParentOkrFormComponent implements OnInit {
  parentOkrs: Okr[];
  objectiveForm: number = 3;
  isParentOkrcomplete: boolean;
  parentOkrform = this.fb.group({
    objective: ['', [Validators.required, Validators.maxLength(40)]],
    primaries: this.fb.array([]),
  });

  get primaries(): FormArray {
    return this.parentOkrform.get('primaries') as FormArray;
  }
  get objectiveControl() {
    return this.parentOkrform.get('objective') as FormControl;
  }
  get primariesControl() {
    return this.parentOkrform.get('primaries') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private okrService: OkrService,
    private authService: AuthService,
    private router: Router,
    private tutorialService: TutorialService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {
    this.okrService.parentOkrs$.subscribe((parentOkrs) => {
      this.parentOkrs = parentOkrs;
      this.checkParentOkr();
    });
  }

  ngOnInit() {
    this.initObjectiveForm();
    // this.determineIfStartingTutorial();
  }

  initObjectiveForm() {
    for (let i = 0; i < 3; i++) {
      this.primaries.push(
        new FormControl('', [Validators.required, Validators.maxLength(20)])
      );
    }
  }

  addObjectiveForm() {
    this.primaries.push(
      new FormControl('', [Validators.required, Validators.maxLength(20)])
    );
    this.objectiveForm++;
  }

  checkParentOkr() {
    if (this.parentOkrs.length === 0) {
      this.isParentOkrcomplete = false;
    } else {
      this.isParentOkrcomplete = true;
    }
  }

  // determineIfStartingTutorial(): void {
  //   this.tutorialService.startTutorial({
  //     okrType: 'parentOkr',
  //     groupIndex: 0,
  //   });
  // }

  removeOption(i: number) {
    this.primaries.removeAt(i);
    this.objectiveForm--;
  }

  createOkr() {
    this.loadingService.loading = true;
    const formedOkrData = this.parentOkrform.value;
    const okrValue: Omit<Okr, 'okrId' | 'isComplete'> = {
      title: formedOkrData.objective,
      primaries: formedOkrData.primaries,
      creatorId: this.authService.uid,
    };
    const primaryArray = formedOkrData.primaries;
    this.okrService
      .createOkr(okrValue, primaryArray, this.authService.uid)
      .then(() => {
        this.loadingService.loading = false;
        this.router.navigateByUrl('manage/home');
        this.snackBar.open('作成しました');
      });
  }
}
