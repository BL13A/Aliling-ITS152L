import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-posts',
  imports: [CommonModule],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent {

  posts?: Post[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initData();
  }
initData(): void {
  this.http.get<Post[]>('https://localhost:7198/api/post')
    .subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
      }
      
    });
  }
}