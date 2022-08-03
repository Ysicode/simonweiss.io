import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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
  screenWidth: any;
  screenHeight: any;
  mobileModus = false;
  @ViewChild('logo1', { static: true }) logo: ElementRef;
  @ViewChild('myName', { static: true }) myName: ElementRef;

  ngOnInit(): void {
    this.animateLogo();
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth < 1000) {
      this.mobileModus = true;
    } else {
      this.mobileModus = false;
    }
  }

  checkScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth < 1000) {
      this.mobileModus = true;
    } else {
      this.mobileModus = false;
    }
  }

  animateLogo() {
    this.animateName('imon', '0');
    this.leftInterval = setInterval(() => {
      this.startRotation('down');
      if (this.rotation > 160) {
        this.animateName('eiss', '1');
        setTimeout(() => {
          this.animateName('eiss', '0');
          this.animateLogoback();
        }, 1500);
        clearInterval(this.leftInterval);
      }
    }, 20)
  }

  startRotation(direction: string) {
    if (direction == 'down') {
      this.rotation++ 
    } else {
      this.rotation--
    }
    this.logo.nativeElement.style.transform = `rotate(${this.rotation}deg)`
  }

  animateName(content: string, opacity: string) {
    this.myName.nativeElement.innerHTML = content;
    this.myName.nativeElement.style.opacity = opacity;
  }

  animateLogoback() {   
    this.rightInterval = setInterval(() => {
      this.startRotation('up');   
      if (this.rotation < 0) {
        this.animateName('imon', '1');
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

  closeMenu() {
    this.open_navbar = false;
  }

}
