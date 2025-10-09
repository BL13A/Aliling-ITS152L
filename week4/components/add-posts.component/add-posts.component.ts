import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { TokenStorageService } from '../../services/token-storage.service'; // token storage

@Component({
  selector: 'app-add-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent {
  title: string = '';
  body: string = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router // Inject Router
  ) {}

  onSubmit(): void {
    const token = this.tokenStorage.getToken();

    if (!token) {
      console.error('No token found — please log in first.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const postData = {
      title: this.title,
      body: this.body
    };

    this.http.post('https://localhost:7198/api/Post/add', postData, { headers, responseType: 'json' })
      .subscribe({
        next: (response) => {
          console.log('Post added successfully:', response);
          alert('Post added successfully!');
          this.title = '';
          this.body = '';
          
        },
        error: (error) => {
          console.error('Error adding post:', error);
          alert('Failed to add post.');
        }
      });
  }

  goToPostList(): void {
    // Navigate to the post 
    this.router.navigate(['/posts']);
  }
}
