import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);
  private token = '';
  private url = '';

  aktualisieren() {
    this.token = localStorage.getItem('token') || '';
    if (!this.token) {
      this.token = prompt("Enter your Jira Token") || '';
      localStorage.setItem('token', this.token);
    }

    this.url = localStorage.getItem('url') || '';
    if (!this.url) {
      this.url = prompt("Enter your Jira URL") || '';
      localStorage.setItem('url', this.url);
    }

    this.queryJira(21232);
  }

  queryJira(sprintId: number) {
    this.http.get(`${this.url}/rest/api/2/search?jql=sprint=${sprintId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/json'
      }
    }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }
}
