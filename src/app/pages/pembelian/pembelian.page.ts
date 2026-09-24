import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-pembelian',
  templateUrl: './pembelian.page.html',
  styleUrls: ['./pembelian.page.scss'],
})
export class PembelianPage implements OnInit {

  purchases: any[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private api: ApiService,
    public auth: AuthService,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPembelian();
  }

  loadPembelian() {
    this.loading = true;
    this.api.getPembelian().subscribe((res: any) => {
      if (res.status) {
        this.purchases = res.data || [];
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  goToUpload(id: number) {
    this.router.navigate(['/upload-bukti', id]);
  }

  goToProfil() {
    this.router.navigate(['/profil']);
  }

  // DOWNLOAD - buka di browser default
  download(url: string) {
    this.iab.create(url, '_system');
  }

  getStatusBadge(status: string): any {
    switch (status) {
      case 'verified': return { color: 'success', text: '✅ Terverifikasi' };
      case 'pending': return { color: 'warning', text: '⏳ Menunggu' };
      case 'rejected': return { color: 'danger', text: '❌ Ditolak' };
      default: return { color: 'medium', text: status };
    }
  }

  doRefresh(event: any) {
    this.loadPembelian();
    setTimeout(() => event.target.complete(), 1000);
  }
}
