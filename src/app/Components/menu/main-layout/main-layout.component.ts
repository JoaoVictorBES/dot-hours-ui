import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponentComponent } from '../../../Util/sidebar-component/sidebar-component.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponentComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
