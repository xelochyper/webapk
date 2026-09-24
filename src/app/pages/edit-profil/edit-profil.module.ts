import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilPage } from './edit-profil.page';

const routes: Routes = [{ path: '', component: EditProfilPage }];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [EditProfilPage]
})
export class EditProfilPageModule {}
