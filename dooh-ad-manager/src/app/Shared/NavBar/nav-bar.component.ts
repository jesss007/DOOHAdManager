import { Component, OnInit } from '@angular/core';
import { sharedImports } from '../Imports/shared-imports';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  navItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.navItems = [
      {
        label: 'Screens',
        icon: 'pi pi-desktop',
        command: () => this.router.navigate(['/screen']),
      },
      {
        label: 'Media Library',
        icon: 'pi pi-images',
        command: () => this.router.navigate(['/media']),
      },
      {
        label: 'Campaigns',
        icon: 'pi pi-megaphone',
        command: () => this.router.navigate(['/campaign']),
      },
    ];
  }
}