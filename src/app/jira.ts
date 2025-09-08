import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  private http = inject(HttpClient);

  query(url: string, token: string, sprintId: number) {
    this.http.get(`${url}/rest/api/2/search?jql=sprint=${sprintId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
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
