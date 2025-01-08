import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(    
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
      translate.addLangs(['en', 'esp', 'fr']);
      translate.setDefaultLang('en');
    }
    switchLanguage(lang: string){
      this.translate.use(lang);
    }
  logout(): void{
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  adminPage():void{
    this.authService.goToAdmin();
  }
}
