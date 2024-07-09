import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../services/authState.sevice';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 constructor(public userStateService: UserStateService) {}
}
