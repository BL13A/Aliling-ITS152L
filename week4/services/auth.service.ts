import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn: boolean = false;
  public redirectUrl: string = "/posts/add";

  constructor(
    private http: HttpClient
  ) 
  {}

  login(username: string, password: string) {
    //  This tells Angular to treat the response as plain text (not JSON)
    return this.http.post("https://localhost:7198/api/Login/login", 
      { username, password },
      { responseType: 'text' } 
    );
  }
}
