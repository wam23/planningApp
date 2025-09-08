import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JiraService } from "./jira";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private jira = inject(JiraService);

  aktualisieren() {
    let url = this.getConfig('url')
    let token = this.getConfig('token')

    this.jira.query(url, token, 21232);
  }

  private getConfig(name: string) {
    let config = localStorage.getItem(name) || '';
    if (!config) {
      config = prompt(`Enter ${name}`) || '';
      localStorage.setItem(name, config);
    }
    return config;
  }

}
