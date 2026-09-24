import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/profil']);
    }
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Email & password wajib diisi');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Login...' });
    await loading.present();

    this.auth.login(this.email, this.password).subscribe(
      (res: any) => {
        loading.dismiss();
        if (res.status) {
          this.showToast('Login berhasil!');
          this.router.navigate(['/home']);
        } else {
          this.showToast(res.message || 'Login gagal');
        }
      },
      () => {
        loading.dismiss();
        this.showToast('Terjadi kesalahan, coba lagi');
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2500, position: 'bottom'
    });
    toast.present();
  }
}
