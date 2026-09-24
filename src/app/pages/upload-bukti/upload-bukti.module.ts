import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { UploadBuktiPage } from './upload-bukti.page';

const routes: Routes = [{ path: '', component: UploadBuktiPage }];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [UploadBuktiPage]
})
export class UploadBuktiPageModule {}
