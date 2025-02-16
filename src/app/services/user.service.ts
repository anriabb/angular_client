import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';

 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://localhost:44330/api/User';
  private adminUrl = 'https://localhost:44330/api/Admin';

  private apiUrl = 'https://localhost:44330/api/User';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {
    
     }

  getJobOptions():Observable<any> {
    let name = 'name';
    console.log("My Name is " + name);
    console.log(`My Name is ${name}`)
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.apiUrl}/login`, userData,
    {headers, responseType: 'text' as 'json'});
  }

  logOut(){
    console.log("Log Out triggered");
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.adminUrl}/delete-user/${id}`);
  }
  

  changeUserRole(req: any): Observable<any> {
    return this.http.post(`${this.adminUrl}/change-user-role`, req);
  }

}
