import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private api: ApiService) {
    const stored = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(stored ? JSON.parse(stored) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get token(): string {
    return this.currentUserValue ? this.currentUserValue.token : null;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(email: string, password: string): Observable<any> {
    return this.api.login({ email, password }).pipe(
      map((res: any) => {
        if (res.status && res.token) {
          const user = {
            token: res.token,
            id: res.user.id,
            full_name: res.user.full_name,
            email: res.user.email,
            whatsapp: res.user.whatsapp,
            avatar: res.user.avatar
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return res;
      })
    );
  }

  register(data: any): Observable<any> {
    return this.api.register(data);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(user: any) {
    const current = this.currentUserValue;
    const updated = { ...current, ...user };
    localStorage.setItem('currentUser', JSON.stringify(updated));
    this.currentUserSubject.next(updated);
  }
}
