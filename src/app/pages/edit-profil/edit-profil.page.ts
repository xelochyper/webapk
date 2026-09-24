import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {

  full_name: string = '';
  email: string = '';
  whatsapp: string = '';

  constructor(
    private router: Router,
    public auth: AuthService,
    private api: ApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    const user = this.auth.currentUserValue;
    this.full_name = user.full_name;
    this.email = user.email;
    this.whatsapp = user.whatsapp || '';
  }

  async save() {
    if (!this.full_name || !this.email) {
      this.showToast('Nama & email wajib diisi');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Menyimpan...' });
    await loading.present();

    const data = {
      full_name: this.full_name,
      email: this.email,
      whatsapp: this.whatsapp
    };

    this.api.updateProfile(data).subscribe(
      (res: any) => {
        loading.dismiss();
        if (res.status) {
          this.auth.updateUser(data);
          this.showToast('Profil berhasil diperbarui');
          this.router.navigate(['/profil']);
        } else {
          this.showToast(res.message || 'Gagal memperbarui');
        }
      },
      () => {
        loading.dismiss();
        this.showToast('Terjadi kesalahan, coba lagi');
      }
    );
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2500, position: 'bottom'
    });
    toast.present();
  }
}
