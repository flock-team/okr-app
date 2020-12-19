import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-okr-dialog',
  templateUrl: './okr-dialog.component.html',
  styleUrls: ['./okr-dialog.component.scss'],
})
export class OkrDialogComponent implements OnInit {
  readonly lists = [
    {
      menu: 'target',
      text: 'テスト',
    },
    {
      menu: 'current',
      text: 'テスト',
    },
    {
      menu: 'percentage',
      text: 'テスト',
    },
    {
      menu: 'lastUpdated',
      text: 'テスト',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      key: string;
      target: number;
      current: number;
      percentage: number;
      lastUpdated: Date;
    }
  ) {}

  ngOnInit(): void {}
}
