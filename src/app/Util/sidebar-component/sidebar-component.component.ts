import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-component',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './sidebar-component.component.html',
  styleUrl: './sidebar-component.component.scss'
})
export class SidebarComponentComponent {

  constructor(private authService: AuthService, private router: Router) {}

  isCollapsed = false;

  isSidebarOpen = false;

  toggleSidebar() {
    if (window.innerWidth <= 425) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  logout() {
    this.authService.logout();
  }

}
