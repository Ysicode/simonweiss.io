import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  open_navbar = false;

  openMenu() {
    this.open_navbar = !this.open_navbar;
  }
  
}
