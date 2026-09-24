import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'katalog',
    loadChildren: () => import('./pages/katalog/katalog.module').then(m => m.KatalogPageModule)
  },
  {
    path: 'detail/:slug',
    loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then(m => m.ProfilPageModule)
  },
  {
    path: 'edit-profil',
    loadChildren: () => import('./pages/edit-profil/edit-profil.module').then(m => m.EditProfilPageModule)
  },
  {
    path: 'pembelian',
    loadChildren: () => import('./pages/pembelian/pembelian.module').then(m => m.PembelianPageModule)
  },
  {
    path: 'upload-bukti/:id',
    loadChildren: () => import('./pages/upload-bukti/upload-bukti.module').then(m => m.UploadBuktiPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
