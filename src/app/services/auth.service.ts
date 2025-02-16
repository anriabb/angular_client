import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44330/api/User';
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  registerUser(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/login`, userData, {headers, responseType: 'text' as 'json'});
  }
  
  logoutUser(): void {
    console.log('Before logout:', localStorage.getItem('token')); // Check token before removal
    localStorage.removeItem('token');
    console.log('After logout:', localStorage.getItem('token')); // Check token after removal
    this.router.navigate(['/login']);
  }
  goToAdmin():void{
    this.router.navigate(['/admin']);
  }
  
  public isAuthenticated() : boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}