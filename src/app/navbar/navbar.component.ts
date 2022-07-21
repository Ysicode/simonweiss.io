import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  openNavbar = false;

  openMenu() {
    this.openNavbar = !this.openNavbar;
  }
  
}
