import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any[] = [];
  statProducts: number = 0;
  statSuccess: number = 0;
  statUsers: number = 0;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadKatalog();
  }

  loadKatalog() {
    this.loading = true;
    this.api.getKatalog(1).subscribe((res: any) => {
      if (res.status) {
        this.products = res.data.slice(0, 8);
        this.statProducts = res.total;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  goToDetail(slug: string) {
    this.router.navigate(['/detail', slug]);
  }

  goToKatalog() {
    this.router.navigate(['/katalog']);
  }

  goToProfil() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  doRefresh(event: any) {
    this.loadKatalog();
    setTimeout(() => event.target.complete(), 1000);
  }
}
