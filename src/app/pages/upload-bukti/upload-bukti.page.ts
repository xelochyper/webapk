import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-upload-bukti',
  templateUrl: './upload-bukti.page.html',
  styleUrls: ['./upload-bukti.page.scss'],
})
export class UploadBuktiPage implements OnInit {

  purchaseId: number = 0;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.purchaseId = Number(this.route.snapshot.paramMap.get('id')) || 0;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async upload() {
    if (!this.selectedFile) {
      this.showToast('Pilih gambar bukti pembayaran dulu');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Mengupload...' });
    await loading.present();

    const formData = new FormData();
    formData.append('proof_image', this.selectedFile, this.selectedFile.name);

    this.api.uploadBukti(this.purchaseId, formData).subscribe(
      (res: any) => {
        loading.dismiss();
        if (res.status) {
          this.showToast('Bukti pembayaran berhasil diupload!');
          this.router.navigate(['/pembelian']);
        } else {
          this.showToast(res.message || 'Gagal upload');
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
