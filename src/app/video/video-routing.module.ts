import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

const authorizedRoutesStructure = {
  data: {
    authOnly: true,
    authGuardPipe: redirectUnauthorizedToHome
  },
  canActivate: [AngularFireAuthGuard]
}

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    ...authorizedRoutesStructure
  },
  {
    path: 'upload',
    component: UploadComponent,
    ...authorizedRoutesStructure
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
