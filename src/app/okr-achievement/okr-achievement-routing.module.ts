import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkrAchievementComponent } from './okr-achievement/okr-achievement.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OkrAchievementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OkrAchievementRoutingModule {}
