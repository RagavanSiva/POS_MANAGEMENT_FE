import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  isCollapsed = false;
  time = new Date();
  constructor(private route: Router) {
    setInterval(() => {
      this.time = new Date();
    }, 1);
  }
  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
