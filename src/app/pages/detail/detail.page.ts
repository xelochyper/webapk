import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  slug: string = '';
  product: any = null;
  links: any[] = [];
  loading: boolean = true;
  paymentMethods: any[] = [];
  showPayment: boolean = false;
  selectedPayment: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public auth: AuthService,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.loadDetail();
    this.loadPaymentMethods();
  }

  loadDetail() {
    this.loading = true;
    this.api.getDetailProduk(this.slug).subscribe((res: any) => {
      if (res.status) {
        this.product = res.data;
        this.links = res.data.links || [];
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  loadPaymentMethods() {
    this.api.getPaymentMethods().subscribe((res: any) => {
      if (res.status) {
        this.paymentMethods = res.data;
      }
    });
  }

  // ==================== DOWNLOAD - BUKA DI BROWSER DEFAULT ====================
  download(url: string, label: string) {
    // Buka di browser default HP (Chrome, dll)
    const browser = this.iab.create(url, '_system');
    // _system = buka di aplikasi browser bawaan HP
  }

  // ==================== BELI ====================
  beli() {
    if (!this.auth.isLoggedIn) {
      this.showToast('Silakan login terlebih dahulu');
      this.router.navigate(['/login']);
      return;
    }
    this.showPayment = true;
  }

  selectPayment(method: any) {
    this.selectedPayment = method;
  }

  async confirmPurchase() {
    if (!this.selectedPayment) {
      this.showToast('Pilih metode pembayaran dulu');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Pembelian',
      message: `Anda akan membeli <strong>${this.product.title}</strong><br>Harga: <strong>${this.product.price_text}</strong><br>Metode: <strong>${this.selectedPayment.name}</strong>`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Ya, Beli',
          handler: () => {
            this.submitPurchase();
          }
        }
      ]
    });
    await alert.present();
  }

  submitPurchase() {
    const data = {
      product_id: this.product.id,
      payment_method_id: this.selectedPayment.id,
      buyer_name: this.auth.currentUserValue.full_name,
      buyer_contact: this.auth.currentUserValue.whatsapp || this.auth.currentUserValue.email
    };

    this.api.submitPembelian(data).subscribe((res: any) => {
      if (res.status) {
        this.showToast('Pembelian berhasil! Silakan upload bukti pembayaran');
        this.showPayment = false;
        this.router.navigate(['/pembelian']);
      } else {
        this.showToast(res.message || 'Gagal memproses pembelian');
      }
    }, () => {
      this.showToast('Terjadi kesalahan, coba lagi');
    });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}
