import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ==================== KATALOG PRODUK ====================
  getKatalog(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}katalog?page=${page}`);
  }

  // ==================== DETAIL PRODUK ====================
  getDetailProduk(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}produk/${slug}`);
  }

  // ==================== LOGIN USER ====================
  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}user/login`, data);
  }

  // ==================== REGISTER USER ====================
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}user/register`, data);
  }

  // ==================== PROFIL USER ====================
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}user/profile`);
  }

  // ==================== UPDATE PROFIL ====================
  updateProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}user/update-profile`, data);
  }

  // ==================== RIWAYAT PEMBELIAN ====================
  getPembelian(): Observable<any> {
    return this.http.get(`${this.apiUrl}pembelian`);
  }

  // ==================== METODE PEMBAYARAN ====================
  getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}payment-methods`);
  }

  // ==================== SUBMIT PEMBELIAN ====================
  submitPembelian(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}purchase/submit`, data);
  }

  // ==================== UPLOAD BUKTI PEMBAYARAN ====================
  uploadBukti(purchaseId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}purchase/upload-proof/${purchaseId}`, formData);
  }

  // ==================== APP SETTINGS (Masa Berlaku) ====================
  getAppSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}app_settings`);
  }
}
