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
  @ViewChild('myName', { static: true }) myName: ElementRef;

  ngOnInit(): void {
    this.animateLogo();
  }

  animateLogo() {
    this.myName.nativeElement.innerHTML = 'imon';
    this.myName.nativeElement.style.opacity = '0';
    this.leftInterval = setInterval(() => {
      this.rotation++
      this.logo.nativeElement.style.transform = `rotate(${this.rotation}deg)`
      if (this.rotation > 160) {
        this.myName.nativeElement.style.opacity = '1';
        this.myName.nativeElement.innerHTML = 'eiss';
        setTimeout(() => {
          this.myName.nativeElement.style.opacity = '0';
          this.animateLogoback();
        }, 1500);
        clearInterval(this.leftInterval);
      }
    }, 20)
  }

  animateLogoback() {
    
    this.rightInterval = setInterval(() => {
      this.rotation--
      this.logo.nativeElement.style.transform = `rotate(${this.rotation}deg)`
      if (this.rotation < 0) {
        this.myName.nativeElement.style.opacity = '1';
        this.myName.nativeElement.innerHTML = 'imon';
        setTimeout(() => {
          
          this.animateLogo();
        }, 1500);
        clearInterval(this.rightInterval);
      }
    }, 20)
  }

  openMenu() {
    this.open_navbar = !this.open_navbar;
  }

}
