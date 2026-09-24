import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.page.html',
  styleUrls: ['./katalog.page.scss'],
})
export class KatalogPage implements OnInit {

  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalProducts: number = 0;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadKatalog(1);
  }

  loadKatalog(page: number) {
    this.loading = true;
    this.api.getKatalog(page).subscribe((res: any) => {
      if (res.status) {
        this.products = res.data;
        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;
        this.totalProducts = res.total;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadKatalog(page);
    }
  }

  goToDetail(slug: string) {
    this.router.navigate(['/detail', slug]);
  }

  goToProfil() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  doRefresh(event: any) {
    this.loadKatalog(this.currentPage);
    setTimeout(() => event.target.complete(), 1000);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
