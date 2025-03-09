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


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;// Envia o estado para o componente pai
  }

  logout() {
    this.authService.logout();
  }

}
