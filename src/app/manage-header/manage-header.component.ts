import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { SecondOkr } from '../interfaces/second-okr';
import { ManageService } from '../manage/manage/manage.service';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { OkrService } from '../services/okr.service';

@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.scss'],
})
export class ManageHeaderComponent implements OnInit {
  user$ = this.authService.user$;
  isSecondOkr: boolean;
  avatarURL: string;
  secondOkrs$: Observable<SecondOkr[]> = this.okrService
    .getSecondOkrs()
    .pipe(tap(() => (this.loadingService.loading = false)));
  secondOkr: SecondOkr;

  constructor(
    private route: ActivatedRoute,
    private manageService: ManageService,
    public authService: AuthService,
    public okrService: OkrService,
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.loadingService.loading = true;
    this.authService.getUser(this.authService.uid).subscribe((result) => {
      this.avatarURL = result?.avatarURL;
    });
  }

  ngOnInit(): void {
    this.secondOkrs$.subscribe((secondOkrs) => {
      console.log(secondOkrs.length);
      if (secondOkrs.length === 0) {
        this.isSecondOkr = false;
      } else {
        this.isSecondOkr = true;
      }
      secondOkrs.map((secondOkr) => {
        if (secondOkr.isComplete === true) {
          this.secondOkr = secondOkr;
        }
      });
    });
  }

  progress() {
    this.router.navigate(['manage/home/secondOkr'], {
      queryParams: { v: this.secondOkr.id },
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  toggle() {
    this.manageService.toggle();
  }
}
