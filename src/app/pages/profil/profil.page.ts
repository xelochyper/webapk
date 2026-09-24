import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  user: any = null;
  loading: boolean = true;

  constructor(
    private router: Router,
    public auth: AuthService,
    private api: ApiService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.api.getProfile().subscribe((res: any) => {
      if (res.status) {
        this.user = res.data;
        this.auth.updateUser(res.data);
      }
      this.loading = false;
    }, () => {
      this.user = this.auth.currentUserValue;
      this.loading = false;
    });
  }

  goToEdit() {
    this.router.navigate(['/edit-profil']);
  }

  goToPembelian() {
    this.router.navigate(['/pembelian']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Yakin ingin keluar?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Ya, Keluar',
          handler: () => {
            this.auth.logout();
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : 'U';
  }
}
