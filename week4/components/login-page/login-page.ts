import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit(): void {
  const { username, password } = this.form;

  this.authService.login(username, password).subscribe(
    (token: string) => {
      this.tokenStorage.saveToken(token);
      this.tokenStorage.saveUser(username);
      this.router.navigate([this.authService.redirectUrl]);
    },
    (error) => {
      console.error('Login failed:', error);
    }
  );
}
}