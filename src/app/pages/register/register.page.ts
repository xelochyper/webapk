import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  full_name: string = '';
  email: string = '';
  whatsapp: string = '';
  password: string = '';
  confirm_password: string = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {}

  async register() {
    if (!this.full_name || !this.email || !this.password) {
      this.showToast('Nama, email & password wajib diisi');
      return;
    }

    if (this.password !== this.confirm_password) {
      this.showToast('Password tidak cocok');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Mendaftar...' });
    await loading.present();

    const data = {
      full_name: this.full_name,
      email: this.email,
      whatsapp: this.whatsapp,
      password: this.password
    };

    this.auth.register(data).subscribe(
      (res: any) => {
        loading.dismiss();
        if (res.status) {
          this.showToast('Pendaftaran berhasil! Silakan login');
          this.router.navigate(['/login']);
        } else {
          this.showToast(res.message || 'Pendaftaran gagal');
        }
      },
      () => {
        loading.dismiss();
        this.showToast('Terjadi kesalahan, coba lagi');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2500, position: 'bottom'
    });
    toast.present();
  }
}
