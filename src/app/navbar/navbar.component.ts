import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  open_navbar = false;
  rotation = 0;
  leftInterval: any;
  rightInterval: any;
  @ViewChild('logo1', { static: true }) logo: ElementRef;

  ngOnInit(): void {
    this.animateLogo();
  }

  animateLogo() {
    this.leftInterval = setInterval(() => {
      this.rotation++
      this.logo.nativeElement.style.transform = `rotate(${this.rotation}deg)`
      if (this.rotation > 100) {
        this.animateLogoback();
        clearInterval(this.leftInterval);
      }
    }, 30)
  }

  animateLogoback() {
    this.rightInterval = setInterval(() => {
      this.rotation--
      this.logo.nativeElement.style.transform = `rotate(${this.rotation}deg)`
      if (this.rotation < 0) {
        this.animateLogo();
        clearInterval(this.rightInterval);
      }
    }, 30)
  }

  openMenu() {
    this.open_navbar = !this.open_navbar;
  }

}
