import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPageComponent implements OnInit {

  form: any = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, password, firstName, lastName } = this.form;

    console.log(this.form);

    this.http.post('https://localhost:7198/api/Login/register', this.form, { responseType: 'text' })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
